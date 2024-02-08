const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Doctor', 'PharmacyUser'],
    required: true,
  },
  // Fields specific to Doctor
  name: {
    type: String,
  },
  phoneNo: {
    type: Number,
  },
  comment: {
    type: String,
  },
  // Fields specific to PharmacyUser
  pharmacyName: {
    type: String,
  },
  pharmacyLocation: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  // token
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// password hashing
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// token generation
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
