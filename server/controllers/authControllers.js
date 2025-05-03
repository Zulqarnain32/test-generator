const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usermodel = require("../models/UserModel");

const register = async (req, res) => {
  try {
    console.log("req body ", req.body);
    
    const { school,email, password} = req.body;
    console.log("user data ", school,email,password);
    
    if(!school || !email || !password ){
      return res.json({message:"please fill all the fields"})
    }
    const user = await Usermodel.findOne({ email });
    if(user){
      return res.json({message:"email already exist"})
    }

    
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new Usermodel({ school,email,password:hashPassword });
    await newUser.save();
    console.log("user registered");
    
    res.json({ message: `user ${email} registered` });
  } catch (err) {
    console.log(err);
    
    res.json(err);
  }
};

const login = async (req, res) => {
  console.log("req body ", req.body);
  const { email, password } = req.body;
  if(!email || !password ){
    return res.json({message:"please fill all the fields"})
  }
  const user = await Usermodel.findOne({ email });
  if(!user){
    return res.json({message:"invalid email"})
  }
  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.json({message:"incorrect password"})
  }
  const token = jwt.sign({id:user._id,role:user.role,school:user.school,email:user.email},"My-Secret-Key")
  return res.json({message:"sucessfully login",token,role:user.role,school:user.school,email:user.email,id:user._id})
};




module.exports = { register, login };