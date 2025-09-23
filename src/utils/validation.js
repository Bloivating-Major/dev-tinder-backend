const validator = require('validator');

const validateSignUpData = (req)=>{
    const { firstName, lastName, email, password } = req.body;
    if(!firstName || !lastName){
        throw new Error('Name is not valid');
    }else if(!email || !validator.isEmail(email)){
        throw new Error('Email is not valid');
    }else if(!password || !validator.isStrongPassword(password)){
        throw new Error('Password is not valid');
    }
};

const validateProfileEditData = (req)=>{
    const allowedEditFields = ['firstName', 'lastName', 'age', 'gender', 'photoURL', 'about', 'skills']

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    return isEditAllowed;
}

const validatePasswordChangeData = (req) =>{
    const { currentPassword, newPassword } = req.body;
    // Check if both fields exist
    if(!currentPassword || !newPassword){
        throw new Error("Both current and new password are required");
    }

    // Check if they're different
    if(currentPassword === newPassword){
        throw new Error("New password must be different from current password");
    }

    // so if all checks passed means the password change data is valid
    return true;
}

module.exports = { validateSignUpData, validateProfileEditData, validatePasswordChangeData };