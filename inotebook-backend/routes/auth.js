const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
var jwt = require('jsonwebtoken');
//Create a user using: POST "/api/auth/createuser", Doesnt require auth

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

module.exports = router