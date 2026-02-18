const express = require("express");
const authRouter = express.Router();
const app = express();
const {validateSignUpData} = require("../utils/validate");
const User = require("../models/user");
const bcrypt =  require("bcrypt");
const passwordHash = require("../models/user").passwordHash;




authRouter.post("/signup", async (req,res) => {
      try{
        validateSignUpData(req);
       const {firstName,lastName,email,password,role} = req.body;
       const user = new User({
         firstName,
         lastName,
         email,
         password,
         role
       }); 
       await user.save();
       res.send("user added successfully"); 
      }catch(err){
        res.status(500).json(err.message)
      }
});


module.exports = authRouter;