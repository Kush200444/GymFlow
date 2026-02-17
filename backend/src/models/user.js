const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[1,`Too Short`],
        maxLength:50
    },
    lastName:{
        type:String,
        minLength:20,
        maxLength:100
    },
    EmailId:{
        type:String,
        required:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email not valid");
            }
        }
    },
    Password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password not valid")
            }
        }
    },
    Role:{
        enum:{
            value:["owner","client","trainer"],
            message:`{VALUE} is the incorrect role`,

        },
        required:true,
        lowercase:true,
    },
    GymId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        index:true,
        unique:true,
        ref:"Gym"
    }
         
},{
    timestamps:true,
})