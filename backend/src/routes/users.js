const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const {userAuth} = require("../middlewares/userAuth");
const {authorizeRoles} = require("../middlewares/authorizeRoles");
const { updateSearchIndex } = require("../models/gym");


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
     const userId=req.params._id;
     const owner = req.user;
     const user = await User.findById(userId);
     res.status(200).json({
        message:"User Data fetched Successfully",user
     });
    }catch(err){
      res.status(404).json({
        message: err.message
      })
    }
});
userRouter.get("/users/active-trainers",userAuth,authorizeRoles("owner"),async(req,res) => {
   try{
     const activeTrainers = await User.find({
        $and:[{role:activeTrainers.role},{isActive:true}]
     })
     res.status(200).json({
        message:"Active Trainers data fetched Successfully",activeTrainers
     })
   }catch(err){
     res.status(404).json("Error : " + err.message);
   }
});
userRouter.get("/users/active-clients", async (req,res) => {
    try{
       const activeClients = await User.find({
         $and:[{role:activeClients.role},{isActive:true}]
       })
       res.status(200).json({
        message:"Active Clients data fetched Successfully",activeClients
       })
    }catch(err){
        res.status(404).json("Error : " + err.message);
    }
});

module.exports = userRouter;