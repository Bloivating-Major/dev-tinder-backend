const express = require('express');
const User = require('../models/user');
const { userAuth } = require('../middleware/auth');

const userRouter = express.Router();

// Get All Users
userRouter.get("/feed", userAuth, async (req, res) => {
  // Logic to fetch user feed
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});


module.exports = userRouter;