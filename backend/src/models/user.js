const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
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
    role: {
        type: String,
        required: true,
        lowercase: true,
        enum: ["owner", "client", "trainer"],
    },
    gymId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Gym"
    }
         
},{
    timestamps:true,
});
userSchema.pre("save", async function() {
   if (!this.isModified("password")) return ;
   this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.comparePassword = async function(passwordInputByUser){
    const user = this;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,user.password);
    return isPasswordValid;
}
module.exports = mongoose.model("User",userSchema);