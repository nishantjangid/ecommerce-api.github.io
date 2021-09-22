const express = require("express");
const userController = require("../../controllers/userController");
const validation = require("../../validation");
const router = express.Router();
const User = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authToken = require("../../verifyToken");

// REGISTRATION ROUTE
router.post("/register", async (req, res) => {

    const { error } = validation.registerValidation(req.body);

    // IF VALIDATION ERROR OCCURE
    if (error) { return res.status(400).send(error.details[0].message) };

    // CHECKING IF USER EXISTS
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send("Email is already registered");

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    // CREATE A NEW USER
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashPassword
    });

    try{
        const saveUser = await user.save();
        res.send({user : user._id});
    }catch(err){
        res.status(400).send(err);
    }    
});


// lOGIN ROUTE
router.post("/login", async (req, res)=>{

    // VALIDATE LOGIN DETAILS
    const {error} = validation.loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // CHECK IS USER IS EXISTS
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Email doesn't exists");

    // PASSWORD IS VALID
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if(!validPass) return res.status(400).send("Invalid password");

    //Create and sign a token
    const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({token : token});
})

router.get("/users",authToken ,async (req, res)=>{

    
})

module.exports = router;