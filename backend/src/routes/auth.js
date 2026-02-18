const express = require("express");
const authRouter = express.Router();
const app = express();
const {validateSignUpData,validateLoginData} = require("../utils/validate");
const User = require("../models/user");
const bcrypt =  require("bcrypt");
const passwordHash = require("../models/user").passwordHash;




authRouter.post("/signup", async (req,res) => {
      try{
        const {firstName,lastName,email,password,role} = req.body;
        validateSignUpData(req);
       const user = new User({
         firstName,
         lastName,
         email,
         password,
         role
       }); 
       await user.save();
       res.json({message : "user added successfully"}); 
      }catch(err){
        res.status(500).json("ERROR :" + err.message)
      }
});

authRouter.post("/login", async (req,res) =>{
      try{
       const {email,password} = req.body;
       validateLoginData(req);
       const user = await User.findOne({
         email:user.email
       })
       if(!user){
        throw new Error("Invalid Credentials")
       };
       const isPasswordValid = await user.comparePassword(password);
       if(!isPasswordValid){
        throw new Error("Invalid Credentials")
       }
       res.json({
        message: "User logged successfully", user
       })


      }catch(err){
        res.status(404).json("ERROR :" + err.message);
      }
});


module.exports = authRouter;