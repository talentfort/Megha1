const mongoose = require("mongoose");

const UsercommentSchema = new mongoose.Schema({
    username: { type: String },
    userPhoneNo: { type: Number },
    userComment: { type: String },
    userReview: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
});

const UserComment = mongoose.model("UserComment", UsercommentSchema);

module.exports = UserComment;
