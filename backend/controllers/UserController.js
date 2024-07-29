const express = require("express");
const jwt = require('jsonwebtoken');
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');


const User = require("../models/userModel");
const generateJWT_Token = require("../utils/JWT_token");
const sendEmail = require("../utils/sendEmail");
exports.Register = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body

        const existingUser = await User.find({email  } , {password:0} );
        if (existingUser[0]) {
           return res.json({
                success:false ,
                message:"User already Exists with the giver email Id"
            })
        }
        const user = await await User.create({
            first_name, last_name, email, password
        })
        if (!user) {
            return res.json({
                success:false ,
                message : "Registered UnsuccessFull",
            })
        }   

            return res.json({
                success: true,
                message: "Registered Successfully",
                user   ,
                token :  await generateJWT_Token(email)
            })
        

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};

exports.Login = async (req, res, next) => {
    const {  email, password } = req.body
    if (!email || !password) {
        res.status(201).json({
            message: "Email or Password missing ",
            success: false
        })
        return 
    }
    const existingUser = await User.findOne({email  }  );
    if (!existingUser) {
        res.status(200).json({
            message: " invalid Email",
            success: false
        })
        return 
    };
    console.log(existingUser);
    const isPasswordMatched = await existingUser.comparePassword(password);

    if (!isPasswordMatched) {
        res.status(200).json({
            message: "WrongPassword  ",
            success: false
        })
        return 
    }

    return res.json({
        success: true,
        message: "Login Successfully",
        user : existingUser ,
        token :  await generateJWT_Token(email)
    })
};


exports.forgotPassword = async (req, res, next) => {
    try {
    
    
        const user = await User.findOne({ email: req.body.email })
        console.log(user);
        if (!user) {
            res.status(200).json({
                message: " User Not Found",
                success: false
            })
            return 
        };
    
        const resetToken = await user.getResetPasswordToken();
        
        await user.save({ validateBeforeSave: false })
    
        const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    
        const message = `Your Password Reset Token is : \n\n ${resetPasswordUrl} \n\n `
    
        try {
            await sendEmail({
                email: user.email,
                subject: "Assignment",
                message
            });
            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} Succesfully`
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined
    
            await user.save({ validateBeforeSave: false })
            res.status(500).json({
                success: false,
                message: `Internal Server Error`
            })
            return 
        }
    
    }  catch (error) {
             res.json({
                success:false,
                message:error.message
             })
    }
    }
    
    
    exports.resetPassword = async (req, res, next) => {
    try {  
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex")
        console.log("resetpasswordToken controller" , resetPasswordToken );
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })
        if (!user) {
            res.status(400).json({
                success: false,
                essage: `Reset password Token is Invalid or has been Expired`
            })
            return 
        }
        if (req.body.password !== req.body.confirmPassword) {
            res.status(400).json({
                success: false,
                message: `Password Doesn't Match`
            })
            return 
        }

        user.password = req.body.password
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined
        await user.save()
        let message = "Password Changed Successfully"
        sendToken(user, message ,200, res)
    
    
    }  catch (error) {
            res.json({
                success:false,
                message:error.message
            })
    }
}

