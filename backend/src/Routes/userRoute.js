const express = require("express");
const { register,login,getalluser ,getsingleuser} = require("../Controllers/userController");
const router = express.Router();
const authenticate=require('../Middleware/auth')

router.post("/register",register);
router.post("/login",login);
router.get('/getallusers',authenticate,getalluser);
router.get('/getsingleuser/:id',authenticate,getsingleuser);

module.exports = router;
