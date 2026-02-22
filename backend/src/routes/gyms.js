const express = require("express");
const { authorizeRoles } = require("../middlewares/authorizeRoles");
const {userAuth} = require("../middlewares/userAuth");
const Gym = require("../models/gym");
const gymRouter = express.Router();


gymRouter.get("/gyms/view", userAuth,authorizeRoles, async (req,res) => {
    try{
      const user = req.user;  
      const gym = await Gym.findById({
        ownerId:user._id
      });
      res.status(200).json({
        message:"Gym data fetch Successfully",gym
      })        
    }catch(err){
        res.status(404).json("Error :" + err.message);
    }
})


module.exports = gymRouter;