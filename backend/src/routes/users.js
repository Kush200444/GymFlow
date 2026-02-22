const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const {userAuth} = require("../middlewares/userAuth");
const {authorizeRoles} = require("../middlewares/authorizeRoles");


userRouter.post("/users/trainers",userAuth,authorizeRoles("owner"),async (req,res) => {
   try{
     const owner = req.user;
     const {firstName,lastName,emailId,password} = req.body;
     const trainer = await User.create({
        firstName:firstName,
        lastName:lastName,
        email:emailId,
        password,
        role:"trainer",
        gymId:owner.gymId           
    }) 
    res.status(200).json({
    message:"Trainer created successfully",trainer
   })       
   }catch(err){
     res.status(401).json("Error : " + err.message)
   }
});
userRouter.post("/users/clients",userAuth,authorizeRoles("owner"),async (req,res) => {
try{
     const owner = req.user;
     const {firstName,lastName,emailId,password} = req.body;
     const client = await User.create({
        firstName:firstName,
        lastName:lastName,
        email:emailId,
        password,
        role:"client",
        gymId:owner.gymId           
   })
   res.status(200).json({
    message:"Client created successfully",client
   })     
  }catch(err){
     res.status(401).json("Error : " + err.message)
   }
});
userRouter.get("/users/me",userAuth, async (req,res) => {
    try{
      const user = req.user;
      res.status(200).json({
        message:"Profile fetched Successfully",user
      })
    }catch(err){ 
       res.status(401).json("Error : " + err.message)
    }
})

module.exports = userRouter;