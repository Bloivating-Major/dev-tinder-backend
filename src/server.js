const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send("Hello Devs Welcome");
})

app.get('/test', (req, res)=>{
    res.send("This is Test Route for Application");
})

app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
});
