const {userAuth} = require("./userAuth");
const authorizeRoles = (...allowedRoles) => {
    return (req,res,next) => {
     try{
      if(!req.user){
        return res.status(401).json({
            message:"User Unauthorized"
        });
      } 
      if(!allowedRoles.includes(req.user.role)){
        return res.status(401).json({
            message:"Invalid Access"
        })
      }  
      next();     
     }catch(err){
       res.status(404).json({
         message:err.message
       })
     }
    }
}

module.exports = {authorizeRoles,}