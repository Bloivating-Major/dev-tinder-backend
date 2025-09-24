const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middleware/auth.js');
const ConnectionRequest = require("../models/connectionRequests.js");

// Send Connection Request
requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const user = req.user;

    // take out the necessory information to make a connection request
    const toUserId = req.params.toUserId;
    const fromUserId = user._id;
    const status = req.params.status;

    // save the information in the database
    const newConnectionRequest =  new ConnectionRequest({
      toUserId,
      fromUserId,
      status,
    });

    const data = await newConnectionRequest.save();

    res
      .status(201)
      .send({ message: `Connection Request Send By ${user.firstName}`, data });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});


module.exports = requestRouter;