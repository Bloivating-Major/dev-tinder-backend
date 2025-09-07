const express = require('express');
const connectDB = require('./config/database.js');
const User = require('./models/user.js');
const app = express();

connectDB();

app.use(express.json());

// User Signup
app.post('/signup', async (req, res)=>{
    // Logic for user signup
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
})

// Get All Users
app.get('/feed', async (req, res)=>{
    // Logic to fetch user feed
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(404).send('Something went wrong');
    }
})

// Get User By Email
app.get('/user', async(req, res)=>{
    const email = req.body.email;
    try {
        // Using findOne might return null if no user is found, leading to potential issues
        const user = await User.findOne({email});

        // Using find instead of findOne to handle potential multiple users with same email
        // const user = await User.find({email});
        if (!user || user.length === 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).send('User not found');
    }
})

connectDB().then(()=>{
    console.log('Database connected');
    app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
});
}).catch((error)=>{
    console.error('Database connection failed:', error);
});
