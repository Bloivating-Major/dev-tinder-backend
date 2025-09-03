const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send("Hello Devs Welcome");
})

app.get('/test', (req, res)=>{
    res.send("This is Test Route for Application");
})

app.get('/profile', (req, res)=> {
    res.send({name :  "Sambhav", age: 21});
})

app.post('/profile', (req, res)=>{
    res.send({message: "This is a post request"});
})

app.patch('/profile', (req, res)=>{
    res.send({message: "This is a patch request"});
});

app.delete('/profile', (req, res)=> {
    res.send({message: "This is a delete request"});
})

app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
});
