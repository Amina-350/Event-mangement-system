const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../Model/UserModel');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const {
      name, email, password,
      gender, role, phone, address, city, country
    } = req.body;

    // password match check
    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: "Passwords do not match" });
    // }

    // check existing user
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(400).json({ message: "Email already registered" });
    // }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
      role,
      phone,
      address,
      city,
      country
    });

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, type: user.type },
      JWT_SECRET,
      { expiresIn: "20h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        type: user.type
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getalluser=async(req,res)=>{
  try{
    
    const Alluser=await User.find();
    res.status(200).json(Alluser)

  }
  catch(error){
  res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
  })

  }

}
exports.getsingleuser=async(req,res)=>{
  try{
const {id}=req.params;
const singleuser=await User.findById(id);
res.status(200).json(singleuser)
  }
  catch(error){
    res.status(500).json({
      message:"server error",
      error:error.message,
    })

  }

}