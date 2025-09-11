const express = require('express');
const connectDB = require('./config/database.js');
const User = require('./models/user.js');
const { validateSignUpData } = require('./utils/validation.js');
const app = express();

connectDB();

app.use(express.json());

// User Signup
app.post('/signup', async (req, res)=>{
    // Logic for user signup
    const user = new User(req.body);

    try {
        // Validate input data
        validateSignUpData(req);

        const {firstName, lastName, email, password} = req.body;

        const user = new User({firstName, lastName, email, password});

        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send('Error registering user' + error.message);
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

// Delete User By Id
app.delete('/user', async(req, res)=>{
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
})

// Update User Details By Id
app.patch('/user/:id', async(req, res)=>{
    const userId = req.params.id;
    const data = req.body;
    try{

        const ALLOWED_UPDATES = ["photoURL", "about", "skills", "gender"];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        if (!isUpdateAllowed) {
             throw new Error('Invalid updates!');
        }

        if(data.skills && data.skills.length > 10){
            throw new Error('Skills cannot be more than 10');
        }

        const user = await User.findByIdAndUpdate(userId, data);
        console.log(user);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User updated');
    }catch(error){
        res.status(400).send('Update failed: ' + error.message);
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
