const express = require('express');
const router = express.Router();
const User = require('../models/User')
//Create a user using: POST "/api/auth/", Doesnt require auth

router.post('/', (req, res)=>{
    
    const user = User(req.body);
    user.save();
    res.json(req.body);
})

module.exports = router