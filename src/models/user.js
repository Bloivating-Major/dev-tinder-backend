const mongoose = require('mongoose');
const validate = require('validator');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required: [true, 'First name is required'],
        minLength : 3,
        maxLength : 50
    },
    lastName : {
        type : String,
        minLength : 3,
        maxLength : 50
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : true,
        lowercase : true,
        trim : true,
        validate(value){
            if(!validate.isEmail(value)){
                throw new Error('Invalid Email Address: ' + value);
            }
        }
    },
    password : {
        type : String,
        required : true,
        minLength : 6,
        maxLength : 1024,
        validate(value){
            if(!validate.isStrongPassword(value)){
                throw new Error('Please Enter a Strong Password: '+ value);
            }
        }
    },
    age : {
        type : Number,
        min : 18,
        max: 100
    },
    gender : {
        type : String,
        validate(value){
            if(!['male', 'female', 'other'].includes(value)){
                throw new Error('Invalid Gender');
            }
        }
    },
    photoURL : {
        type : String,
        default : "https://i.pinimg.com/736x/91/b3/8a/91b38a3ac3937419fc9bafcb7d7d1c4a.jpg",
        validate(value){
            if(!validate.isURL(value)){
                throw new Error('Invalid Photo URL: ' + value);
            }
        }
    },
    about : {
        type : String,
        default : "Hey there! I am using DevTinder.",
    },
    skills : {
        type : [String],
    },  
},{
    timestamps : true
});

module.exports = mongoose.model('User', userSchema);