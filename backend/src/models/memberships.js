const mongoose =  require("mongoose");
const User = require("../models/user");
const Gym = require("../models/gym");
const membershipSchema = new mongoose.Schema({
 clientId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
    index:true
 },
 gymId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Gym",
    index:true
 },
 status:{
    type:String,
    enum:["active","expired","cancelled"],
    default:"active"
 },
 planName:{
    type:String,
    required:true,
    lowercase:true,
    trim:true
 },
 startDate:{
    type:Date,
    required:true
 },
 price:{
   type:Number,
   min:0
 },
 endDate:{
    type:Date,
    required:true
 },
 createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
 }
},{
    timestamps:true
});

module.exports = mongoose.model("Membership",membershipSchema);