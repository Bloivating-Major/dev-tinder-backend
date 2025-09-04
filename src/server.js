const express = require('express');
const {adminAuth, userAuth} = require('./middleware/auth.js');

const app = express();

// we will be creating a middleware to verify if the user is admin or not

app.use('/admin', adminAuth);

app.get('/user/login', (req, res)=>{
    res.send('User login');
})

app.get('/user/getProfile', userAuth, (req, res)=>{
    res.send('Getting user profile');
})

app.get('/admin/getAllData', (req, res)=>{
    // verify if the user is admin
    res.send('Getting all data');
})

app.get('/admin/deleteAllData', (req, res)=>{
    // verify if the user is admin
    res.send('Deleting all data');
})

// wildcard route for error handling
app.use("/", (err, req, res, next) =>{
    if(err){
        return res.status(500).send('Something went wrong');
    }
});

app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
});
