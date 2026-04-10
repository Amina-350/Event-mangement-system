import express from "express";
const app = express();

import {connectDB} from "./utility/index.js";
// import { connectDB } from "./utility/dbMySqlConnection.js";

import userRouter from "./Routes/userRoute.js";
import ProfileRouter from "./Routes/profileRoute.js";
import EventRoute from "./Routes/EventRoute.js";
import BookMeetingRoute from "./Routes/BookMeetingRoute.js";

import cors from "cors";

// ✅ CORS FIRST
app.use(cors()); // this handles preflight automatically

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect Database
connectDB();

// ✅ API Routes
app.use("/api/user", userRouter);
app.use("/api/Profile", ProfileRouter);
app.use('/api/Event',EventRoute)
app.use('/api/Meeting',BookMeetingRoute);
export default app;
