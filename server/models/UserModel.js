const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String },
    school: { type: String },
    password: { type: String },
});

const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;