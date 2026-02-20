const express = require("express");
const authRouter = express.Router();
const jwt =  require("jsonwebtoken");
// debug: log validation utilities
const validationUtils = require("../utils/validate");
const {validateSignUpData,validateLoginData,validateGymData} = validationUtils;
const User = require("../models/user");
const Gym = require("../models/gym");
const bcrypt =  require("bcrypt");
const { userAuth } = require("../middlewares/userAuth");


authRouter.post("/auth/signup-owner", async (req,res) => {
      try{
       const {gymName,gymEmail,gymPhoneNumber,gymAddress,firstName,lastName,email,password} =req.body;
       validateGymData(req);
       const gym = new Gym({
         gymName,
         gymEmail,
         gymPhoneNumber,
         gymAddress
       });
       validateSignUpData(req);
       const user = await User.create({
         firstName,
         lastName,
         email,
         password,
         role:"owner",
         gymId:gym._id
       }); 
       gym.ownerId = user._id;
       await gym.save();
       res.json({message : "user and gym added successfully",gym,user}); 
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