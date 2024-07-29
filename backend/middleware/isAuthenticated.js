const jwt = require('jsonwebtoken');
const express = require("express");
const User = require('../models/userModel');

const isAuthenticated = async (req, res , next )=>{
    const authHeader = req.headers['x-authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET );
        const result = await User.find({email:decoded.email} )
        req.user = result[0]
    } catch (error) {
        // res.status(200).json({ success:false , message: 'Invalid token' });
    }
    next()  
}

module.exports=isAuthenticated