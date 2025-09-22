const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middleware/auth.js');

// Get Profile
profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({ message: "Profile fetched successfully", user });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = profileRouter;