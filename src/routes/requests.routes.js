const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middleware/auth.js');

// Send Connection Request
requestRouter.post("/send/accept", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res
      .status(201)
      .send({ message: `Connection Request Send By ${user.firstName}` });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});


module.exports = requestRouter;