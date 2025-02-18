const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const {validationResult} = require('express-validator')
const blackListTokenModel = require('../models/blacklistToken.model');
const { findOne } = require('../models/captain.model');

module.exports.registerUser = async (req, res , next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {fullname , email , password} = req.body;
  const isUserAlreadyExist = await userModel.findOne({email});
  if(isUserAlreadyExist){
    return res.status(400).json({message: "User Already Exist"})
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res.status(201).json({token, user})

}

module.exports.loginUser = async (req , res , next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  const {email , password} = req.body;

  const user = await userModel.findOne({email}).select('+password');
  if(!user){
    return res.status(401).json({message: "Invalid email or password "})
  }

  const isMatch = await user.comparePassword(password);

  if(!isMatch){
    return res.status(401).json({message: "Invalid email or password "})
  }

  const token = user.generateAuthToken();

  res.cookie('token',token);

  res.status(200).json({token, user});
}

module.exports.getUserProfile = async (req, res, next) =>{
  res.status(200).json(req.user); 
}

module.exports.logoutUser = async (req, res, next) => {
  try {
    // Get token from either cookie or Authorization header
    const token = req.cookies.token || 
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Add to blacklist
    await blackListTokenModel.create({ token });
    
    // Clear cookie
    res.clearCookie('token');
    
    return res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};