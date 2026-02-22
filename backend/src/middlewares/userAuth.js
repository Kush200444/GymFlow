const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req,res,next) => {
 const {token} = req.cookies || {};
 try{
   if(!token){
      throw new Error("Token is not present");
   }
   let decoded;
   try {
     decoded = jwt.verify(token, "Kush@12345");
   } catch (jwtErr) {
     throw new Error("Token is not valid");
   }
   // we don't need the expires option here; JWT already encodes exp

    console.log(token);
    const user = await User.findById({_id:decoded._id});
    if(!user){
    throw new Error("User not found");
    }
    if(user.isActive==="false"){
        throw new Error("Invalid Access");
    } 
    
    req.user = user;
    next();
 }catch(err){
    res.json({
        message: err.message
    })
 }
}

module.exports = {userAuth,}