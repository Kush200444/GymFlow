const express = require("express");
const gymRouter = express.Router();
const { authorizeRoles } = require("../middlewares/authorizeRoles");
const {userAuth} = require("../middlewares/userAuth");
const Gym = require("../models/gym");



gymRouter.get("/gyms/view", userAuth,authorizeRoles("owner"), async (req,res) => {
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


module.exports = gymRouter;