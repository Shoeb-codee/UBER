const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser = async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const isBlacklisted = await blackListTokenModel.findOne({token: token});
  if(isBlacklisted){
    return res.status(401).json({message:"Unauthorized"});
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;

    return next();

  } catch (err) {
    return res.status(401).json({ massage: "Unauthorized" })
  }
}

module.exports.authCaptain = async (req,res,next)=>{
  const token = 
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);
console.log(token)
  if(!token){
    return res.status(401).json({message: "Unauthorized"})
  }

  const isBlacklisted = await captainModel.findOne({token: token});
  if(isBlacklisted){
    return res.status(401).json({message:"Unauthorized"});
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id)
    req.captain = captain;

    return next();
}catch(err){
  return res.status(401).json({message:"Unauthorized"})
}
}