import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from "../Model/UserModel.js";
import { sendSuccess, sendError } from "../utility/index.js";
// eslint-disable-next-line no-console
const JWT_SECRET = process.env.JWT_SECRET;// eslint-disable-next-line no-console
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      gender,
      role,
      phone,
      address,
      city,
      country,
    } = req.body;
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
      country,
    });

    sendSuccess(res);
  } catch (err) {
    console.error(err);
    sendError(res, err);
  }
};
export const login = async (req, res) => {
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
      { expiresIn: "20h" },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        type: user.type,
      },
    });
  } catch (err) {
    sendError(res, err);
  }
};
export const getalluser = async (req, res) => {
  try {
    const Alluser = await User.find();
    sendSuccess(res, Alluser);
  } catch (error) {
    sendError(res, error);
  }
};
export const getsingleuser = async (req, res) => {
  try {
    const { id } = req.params;
    const singleuser = await User.findById(id);
    sendSuccess(res, singleuser);
  } catch (error) {
    sendError(res, error);
  }
};
