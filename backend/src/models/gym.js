const mongoose = require("mongoose");
const validator = require("validator");
const gymSchema = new mongoose.Schema({
    gymName:{
        type:String,
        required:true,
        minLength:[5,`Too short Name`],
        maxLength:20
    },
    gymEmail:{
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
    gymPhoneNumber:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error("Invalid Phone Number")
            }
        }
    },
    gymAddress:{
        type:String,
        required:true,
        minLength:[12,'Not enough characters'],
        maxLength:100,
    },
    ownerId:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isActive:{
        type:Boolean,
        default:true
    } 
},{
    timestamps:true
});
module.exports = mongoose.model("Gym",gymSchema);