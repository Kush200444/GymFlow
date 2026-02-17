require("dotenv").config();
const express = require("express");
const app = express();
const Gym = require("./models/gym");
const {connectDB} = require("./config/database");

app.use("/signup",async (req,res)=>{
    try{
    const gym = new Gym({
        Name:"Muscle Head",
        EmailId:"musclehead@gmail.com",
        Password:"Muscle@12345",
        PhoneNumber:"9888078357",
        Address:"pathankot sujanpur" 
    })
    await gym.save();
    res.send("gym added successfully");
    }catch(err){
      res.status(404).send(err.message);
    }
})

connectDB().then(()=>{
    console.log("Database connected Successfully");
    app.listen(process.env.PORT,()=>{
        console.log("Server running Successfully ");
    })}).catch((err)=>{
        console.error(err.message);
    })