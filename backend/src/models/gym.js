const mongoose = require("mongoose");
const validator = require("validator");
const gymSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        minLength:[5,`Too short Name`],
        maxLength:20
    },
    EmailId:{
        type:String,
        required:true,
        index:true,
        unique:true,
        lowercase:true,
        validate(value){
         if(!validator.isEmail(value)){
            throw new Error("Invalid E-mail Id");
         }
        }
    },
    Password:{
      type:String,
      required:true,
      trim:true,
      validate(value){
        if(!validator.isStrongPassword){
            throw new Error("Invalid Password")
        }
      }

    },
    PhoneNumber:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error("Invalid Phone Number")
            }
        }
    },
    Address:{
        type:String,
        required:true,
        minLength:[12,'Not enough characters'],
        maxLength:100,
    }
},{
    timestamps:true
});
module.exports = mongoose.model("Gym",gymSchema);