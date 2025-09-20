const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    // get token from cookie
    const { token } = req.cookies;

    // if we don't have token
    if (!token) {
      throw new Error("Unauthorized access");
    }

    // validate token
    const decoded = jwt.verify(token, "thisisthesecretkey");

    // get user info from token
    const user = await User.findById(decoded._id);

    // if user not available then throw error

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR : ", error.message);
  }
};

module.exports = { userAuth };
