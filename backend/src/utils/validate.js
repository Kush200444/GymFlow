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
const validateGymData = function(req){
    const{gymName,gymEmail,gymPhoneNumber,gymAddress}=req.body;
    if(!gymName){
        throw new Error("Enter the gym Name");
    }
    if(!validator.isEmail(gymEmail)){
        throw new Error("Invalid E-mail")
    }
    if(!validator.isMobilePhone(gymPhoneNumber)){
        throw new Error("Invalid Phone Number");
    }   
}
module.exports = {validateSignUpData,validateLoginData,validateGymData};