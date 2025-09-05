const express = require('express');
const connectDB = require('./config/database.js');
const User = require('./models/user.js');
const app = express();

connectDB();

app.post('/signup', async (req, res)=>{
    // Logic for user signup
    const user = new User({
        firstName : 'Sambhav',
        lastName: 'Wakhariya',
        email : "sambhav@example.com",
        password : 'password123',
        age : 21,
        gender : 'Male'
    });

    try {
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send('Error registering user');
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
