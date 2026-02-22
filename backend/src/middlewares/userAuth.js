const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req,res,next) => {
 const {token} = req.cookies || {};
 try{
 if(!token){
    return res.status(401).json({message: "Token is not present"});
 }
 const decoded = jwt.verify(token,"Kush@12345");
 const user = await User.findById(decoded._id);
 if(!user){
    return res.status(401).json({message: "User not found"});
 }
 if(user.isActive === false){
        return res.status(403).json({message: "Invalid Access"});
 }
 req.user = user;
 next();
 }catch(err){
    // JWT errors will be thrown here
    return res.status(401).json({message: err.message});
 }
}

module.exports = {userAuth,}