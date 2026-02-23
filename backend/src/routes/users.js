const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const {userAuth} = require("../middlewares/userAuth");
const {authorizeRoles} = require("../middlewares/authorizeRoles");
const {validateUserEditData} = require("../utils/validate");



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
});
userRouter.get("/users/:userId",userAuth,authorizeRoles("owner"), async(req,res) => {
    try{
    
    const userId = req.params.userId;
     const owner = req.user;
     const user = await User.find({
        $and:[{_id:req.params.userId},{gymId:owner.gymId}]
     });
     if(user.length===0){
        throw new Error("Invalid Request");
     }
     res.status(200).json({
        message:"User Data fetched Successfully",user
     });
    }catch(err){
      res.status(404).json({
        message: err.message
      })
    }
});

userRouter.patch("/users/:userId", userAuth,authorizeRoles("owner"), async (req,res) => {
    try{
      validateUserEditData(req);  
      const userId = req.params.userId;
      const owner = req.user;
      const user = await User.find({
        $and:[{_id:req.params.userId},{gymId:owner.gymId}]
      });
      if(user.length===0){
        throw new Error("User not found")
      }
     Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));      
     await user.save();
      res.status(200).json({
        message: "User edited Successfully",user
      })
      
    }catch(err){
     res.status(404).json("Error : " + err.message)        
    }
});

userRouter.get("/users",userAuth,authorizeRoles("owner"), async (req,res) => {
    try{
     const {role,status} = req.query;
     const owner  = req.user;
     const filter = {gymId:owner.gymId}
     if(role){
        filter.role = role;
     }
     if(status !== undefined){
        filter.isActive = (status === "true")  // because query 
     }
     const users = await User.find(filter).select("-password");
     res.status(200).json({
        message:"Data fetched Successfully",users
     })
    }catch(err){
        res.status(404).json("Error : " + err.message)
    }
});

module.exports = userRouter;