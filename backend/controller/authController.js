require('../db/conn');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const User = require('../model/userSchema');

exports.signup = catchAsync(async (req, res, next) => {
  const {
    email,
    password: hashedPassword,
    role,
    status,
    pharmacyName,
    pharmacyLocation,
  } = req.body;

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    return res.status(422).json({ error: 'Email already Exist' });
  } else {
    const user = new User({
      email,
      password: hashedPassword,
      role,
      status,
      pharmacyName,
      pharmacyLocation,
    });
    await user.save();
    res.status(201).json({ message: 'user registered successfully' });
  }
});
exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const userLogin = await User.findOne({ email });

  if (userLogin) {
    const isMatch = await bcrypt.compare(password, userLogin.password);
    const token = await userLogin.generateAuthToken();

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.cookie('jwtoken', token, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return res.status(201).json({
      success: 'User signed in successfully',
      data: {
        user: userLogin._id,
        email: userLogin.email,
        role: userLogin.role,
        status: userLogin.status,
        name: userLogin.role === 'Doctor' ? userLogin.name : undefined,
        phoneNo: userLogin.role === 'Doctor' ? userLogin.phoneNo : undefined,
        comment: userLogin.role === 'Doctor' ? userLogin.comment : undefined,
        pharmacyName:
          userLogin.role === 'PharmacyUser'
            ? userLogin.pharmacyName
            : undefined,
        pharmacyLocation:
          userLogin.role === 'PharmacyUser'
            ? userLogin.pharmacyLocation
            : undefined,
      },
    });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
});
exports.signout = (req, res) => {
  res.clearCookie('jwtoken', { path: '/' });
  res.status(200).json({ status: 'Cookie has been deleted!' });
};
exports.restrictTo = function (...roles) {
  return function (req, res, next) {
    if (!roles.includes(req.rootUser.role)) {
      return next(
        new Error('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
exports.getPharmacyUsers = catchAsync(async (req, res, next) => {
  const pharmacyUsers = await User.find({ role: 'PharmacyUser' }).select('-password');
  res.status(200).json({ data: pharmacyUsers });
});

exports.updatePharmacyUserStatus = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { status } = req.body;

  const updatedUser = await User.findByIdAndUpdate(userId, { status }, { new: true });

  res.status(200).json({ data: updatedUser });
});
