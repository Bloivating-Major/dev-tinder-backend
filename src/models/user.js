const mongoose = require("mongoose");
const validate = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: 3,
      maxLength: 50,
      validate: {
        validator: function (v) {
          return !/[\p{Emoji}]/u.test(v);
        },
        message: "First Name cannot contain emojis",
      },
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 50,
      validate: {
        validator: function (v) {
          return !/[\p{Emoji}]/u.test(v);
        },
        message: "Last Name cannot contain emojis",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validate.isEmail(value)) {
          throw new Error("Invalid Email Address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 1024,
      validate(value) {
        if (!validate.isStrongPassword(value)) {
          throw new Error("Please Enter a Strong Password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid Gender");
        }
      },
    },
    photoURL: {
      type: String,
      default:
        "https://i.pinimg.com/736x/91/b3/8a/91b38a3ac3937419fc9bafcb7d7d1c4a.jpg",
      validate(value) {
        if (!validate.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "Hey there! I am using DevTinder.",
      maxLength: 500,
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "thisisthesecretkey", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInput) {
  const user = this;
  const passwordHash = user.password;

  const isValid = await bcrypt.compare(passwordInput, passwordHash);

  return isValid;
};

module.exports = mongoose.model("User", userSchema);
