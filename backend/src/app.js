const express = require("express");
const app = express();
const { connectDB } = require("./utility/dbConnection");
// const {connectDB}=require('./utility/dbMySqlConnection')
const userRouter = require("./Routes/userRoute");
const ProfileRouter = require("./Routes/profileRoute");
const EventRoute=require('./Routes/EventRoute');
const cors = require("cors");


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

module.exports = app;
