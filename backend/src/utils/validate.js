const validator = require("validator");
const validateSignUpData = function(req){
    const{firstName,email,password} = req.body;
    if(!firstName){
        throw new Error("Enter your name")
    } 
    if(!validator.isEmail(email)){
        throw new Error("Invalid Email")
    } 
    if(!validator.isStrongPassword(password)){
        throw new Error("Must be Strong password")
    }
}
const validateLoginData = function(req){
    const{email,password} = req.body;   
    if(!validator.isEmail(email)){
        throw new Error("Invalid Email")
    }       
    if(!validator.isStrongPassword(password)){
        throw new Error("Must be Strong password")
    }   
}
module.exports = {validateSignUpData,validateLoginData};