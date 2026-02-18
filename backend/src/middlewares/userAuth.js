const jwt = require("jsonwebtoken");
const User = require("../models/user")
const userAuth = async (req,res,next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token is not valid");
        }
        const decoded  = await jwt.verify(token, 'Kush@12345',{
        expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
        });
        const user =  await User.findById({_id:decoded._id});
        if(!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();
    }catch(err){
        res.status(401).json({"Error " : err.message})
    }}

module.exports = {userAuth,}