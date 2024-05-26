const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const authToken = (_id) => {
  const jwtkey = "allambellam";

  return jwt.sign({ _id }, jwtkey);
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json("User whith this email already exists...");
    }

    if (!name || !email || !password) {
      return res.status(400).json("All fields can't be empty...");
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json("invalid email");
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json("invalid password");
    }

    user = new userModel({ name, email, password }); //creating new user

    const salt = await bcrypt.genSalt(10); //generating salt

    user.password = await bcrypt.hash(user.password, salt); //hashing and adding salt to the user password

    await user.save(); //saving user to the db

    const token = authToken(user._id);

    return res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    res.status(400).json("internal server error");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json("inavllid details");
    }

    const isValidPassword = await bcrypt.compare(password,user.password)
    if(!isValidPassword){
        return res.status(400).json("invalid details")
    }

    const token = authToken(user._id);

    return res.status(200).json({ _id: user._id, name: user.name, email, token });

  } catch (error) {
    res.status(400).json("internal server error");
  }
};

const fetchUser = async (req,res) =>{
    const userId = req.params.userId
    
    try {
        const user = await userModel.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json("internal server error");
    }
}


const fetchAllUser = async (req,res) =>{    
    try {
        const user = await userModel.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json("internal server error");
    }
}

module.exports = { registerUser, loginUser, fetchUser, fetchAllUser };