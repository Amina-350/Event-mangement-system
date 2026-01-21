const express = require("express");
// const { connectDB } = require("./utility/dbConnection");
const {connectDB}=require('./utility/dbMySqlConnection')
const userRouter = require("./Routes/userRoute");

const app = express();
app.use(express.json());

async function startApp() {
  const db = await connectDB();   // ✅ wait for DB connection

  app.locals.db = db;             // ✅ now this is the actual DB instance

  app.use("/api/user", userRouter);
}

startApp();

module.exports = app;
