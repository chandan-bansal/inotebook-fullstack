const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');
//Route1: Create a user using: POST "/api/auth/createuser", Doesnt require auth

const JWT_SECRET = "Chandan Bansal"
router.post('/createuser', [
    body('name',"Enter a valid name").isLength({min:3}),
    body('email', "Enter a valid name").isEmail(),
    body('password', "Password must be at least 5 characters").isLength({min:5}),
],async (req, res)=>{
    // If errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    //Check whether the same user with this email exists already
    
    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error:"User with this email exist"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        })
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json(authtoken)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//Route 2: Authenticate user using: POST "/api/auth/login", Doesnt require auth
router.post('/login', [
    body('email', "Enter a valid name").isEmail(),
    body('password', "Password cannot be blank").exists(),
],async (req, res)=>{
    // If errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please login with correct credentials"});

        }

        const payload = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(payload, JWT_SECRET);
        res.json({authtoken})

    }catch(error){
        res.status(500).send("Internal Server Error")
    }
})

//Route 3: Find logged in user details : GET /api/auth/getUser

router.post("/getuser",fetchuser, async (req, res) =>{
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);

    }catch(error){
        res.status(500).send({error: "Internal Server Error"})
    }
})

module.exports = router