const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    birthday: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    img: { type: String, default: "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
