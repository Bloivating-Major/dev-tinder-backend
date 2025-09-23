const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middleware/auth.js');
const bcrypt = require('bcrypt');
const { validateProfileEditData, validatePasswordChangeData } = require('../utils/validation.js');

// Get Profile
profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({ message: "Profile fetched successfully", user });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

// Edit Profile
profileRouter.patch('/edit', userAuth, async(req, res)=>{
  try {
    if(!validateProfileEditData(req)){
      throw new Error("Invalid Edit Fields");
    }

    const user = req.user;

    Object.keys(req.body).forEach((field)=>{
      user[field] = req.body[field];
    })

    await user.save();
    res.status(200).send({message: "Profile updated successfully", user});
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
})

// Change Password
profileRouter.patch('/password', userAuth, async(req, res)=>{
  try {
    // Validate the Password Change Data
    validatePasswordChangeData(req);

    // Get the user and passwords
    const user = req.user;
    const { currentPassword, newPassword } = req.body;

    // Validate current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if(!isPasswordValid){
      throw new Error("Current Password is incorrect");
    }

    // Hash the new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = newHashedPassword;
    await user.save();

    // Send success response
    res.status(200).send({message: "Password changed successfully"});
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});


module.exports = profileRouter;