const express = require("express");
const app = express();
const {validateSignUpData} = require("../utils/validate");
const User = require("../models/user");
const authRouter = express.Router();
app.use(express.json())



authRouter.post("/signup", async (req,res) => {
      try{
        validateSignUpData(req);
       const {firstName,lastName,email,password} = req.body;
       const user = new User({
         firstName,
         lastName,
         email,
         password
       });
       
       await user.save();
       res.send("user added successfully"); 
      }catch(err){
        res.status(500).json(err.message)
      }
});

module.exports = authRouter;