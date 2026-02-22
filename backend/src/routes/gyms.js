const express = require("express");
const gymRouter = express.Router();
const { authorizeRoles } = require("../middlewares/authorizeRoles");
const {userAuth} = require("../middlewares/userAuth");
const Gym = require("../models/gym");
const { validateGymEditData } = require("../utils/validate");


gymRouter.get("/gyms", userAuth,authorizeRoles("owner"), async (req,res) => {
    try{
      const owner = req.user;  
      const gym = await Gym.findOne({
        ownerId:owner._id
      });
      res.status(200).json({
        message:"Gym data fetch Successfully",gym
      })        
    }catch(err){
        res.status(404).json("Error :" + err.message);
    }
});
gymRouter.patch("/gyms",userAuth,authorizeRoles("owner"),async (req,res) => {
    try{
         if(!validateGymEditData(req)){
            throw new Error("Invalid Request")
         }
         const owner = req.user;
         Object.keys(req.body).forEach((key)=>(owner[key] = req.body[key]));
         await user.save();
         res.json({message:`${owner.firstName}, your Gym was updated successfully`,data:owner});   
   }catch(err){
        res.status(404).json("Error :" + err.message);
    }
})


module.exports = gymRouter;