const express = require("express");
const authRouter = express.Router();
const jwt =  require("jsonwebtoken");
const {validateSignUpData,validateLoginData} = require("../utils/validate");
const User = require("../models/user");
const Gym = require("../models/gym");
const bcrypt =  require("bcrypt");
const { userAuth } = require("../middlewares/userAuth");


authRouter.post("/auth/signup-owner", async (req,res) => {
      try{
        const {firstName,lastName,email,password} = req.body;
        validateSignUpData(req);
       const user = new User({
         firstName,
         lastName,
         email,
         password,
         role:"owner",

         
       }); 
       await user.save();
       res.json({message : "user added successfully"}); 
      }catch(err){
        res.status(500).json("ERROR :" + err.message)
      }
});
authRouter.post("/auth/login", async (req,res) =>{
      try{
       validateLoginData(req); 
       const {email,password} = req.body;
       const user = await User.findOne({
         email:email
       })
       if(!user){
        throw new Error("Invalid Credentials")
       };
       const isPasswordValid = await user.comparePassword(password);
       if(!isPasswordValid){
        throw new Error("Invalid Credentials")
       }
        const token = await user.getJWT();
        res.cookie("token",token); 
        res.json({
        message: "User logged successfully", user
       })}catch(err){
        res.status(404).json("ERROR :" + err.message);
      }
});

module.exports = authRouter;