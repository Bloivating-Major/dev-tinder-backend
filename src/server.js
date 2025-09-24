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
- Create Connnection Request Schema ✅
 - Send Connection Request API ✅
 - Proper validation of Data
 - Think about ALL corner cases
 - $or query $and query in mongoose - https://www.mongodb.com/docs/manual/reference/operator/query-logical/
 - schema.pre("save") function
 - Read more about indexes in MongoDB
 - Why do we need index in DB?
 - What is the advantages and disadvantage of creating?
 - Read this arcticle about compond indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
 - ALWAYS THINK ABOUT CORNER CASES 
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
