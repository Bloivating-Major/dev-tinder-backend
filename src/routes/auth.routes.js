const express = require('express');
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require('../models/user.js');
const { validateSignUpData } = require('../utils/validation');


// User Signup
authRouter.post("/signup", async (req, res) => {
  try {
    // Validate input data
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(400).send("Error registering user" + error.message);
  }
});

// User Login
authRouter.post("/login", async (req, res) => {
  try {
    // take email and password
    const { email, password } = req.body;

    // check if email and password are present
    if (!email || !password) {
      throw new Error("Email and Password are required");
    }

    // validate email first is it present in db
    const validUser = await User.findOne({ email });

    if (!validUser) {
      throw new Error("Invalid Credentials");
    }

    // check if password is correct or not
    const validPassword = await validUser.validatePassword(password);

    if (validPassword) {
      // Generate JWT token
      const token = await validUser.getJWT();

      // Send token in cookie
      res.cookie("token", token, { expires: new Date(Date.now() + 3600000) });

      res.status(201).send("Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports = authRouter;
