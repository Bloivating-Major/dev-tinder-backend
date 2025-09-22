const express = require("express");
const connectDB = require("./config/database.js");
const cookieParse = require("cookie-parser");
const authRouter = require('./routes/auth.routes.js');
const profileRouter = require('./routes/profile.routes.js');
const requestRouter = require("./routes/requests.routes.js");
const userRouter = require("./routes/user.routes.js");

const app = express();

connectDB();

// TODOS
/**
- Explore tinder APIs ✅
 - Create a list all API you can think of in Dev Tinder ✅
 - Group multiple routes under repective routers ✅
 - Read documentation for express.Router ✅
 - Create routes folder for managing auth,profile, request routers ✅
 - create authRouter, profileRouter, requestRouter ✅
 - Import these routers in app.js ✅
 */

app.use(express.json());
app.use(cookieParse());


// Auth Routes
app.use('/', authRouter);

// Profile Routes
app.use('/profile', profileRouter);

// Requests Routes
app.use('/request', requestRouter);

// User Routes
app.use('/user', userRouter);

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
