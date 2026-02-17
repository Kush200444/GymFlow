const mongoose = require("mongoose");
const validator = require("validator");
const Gym = require("./gym");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[1,`Too Short`],
        maxLength:50
    },
    lastName:{
        type:String,
        minLength:1,
        maxLength:100
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        index:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email not valid");
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password not valid")
            }
        }
    },
    role:{
        type:String,
        required:true,
        lowercase:true,
        enum:{
            value:["owner","client","trainer"],
            message:`{VALUE} is the incorrect role`,

        },
        
        
    },
    gymId:{
        type:mongoose.Schema.Types.ObjectId,
    
        ref:"Gym"
    }
         
},{
    timestamps:true,
});
module.exports = mongoose.model("User",userSchema);