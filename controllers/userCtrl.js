import express from 'express';
import User from "../model/user.js";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import { getTokenFromHeader } from '../utils/getTokenFromHeader.js';
import { verifyToken } from '../utils/verifyToken.js';

// @desc    Register User
// @route   POST /api/v1/users/register
// @access  Private/Admin

export const registerUserCtrl = asyncHandler(async(req, res) => {
    const {fullname, email, password} = req.body;           //It extracts fullname, email, and password from the req.body
  //Check user exists
  const userExists = await User.findOne({email});
  if(userExists) {
    //Throw
    throw new Error("User already exists");
  }
 //Hash Password
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(password, salt);          //Random password generator

 //Create user
 const user = await User.create({
    fullname, email, password: hashedPassword, 
 });
 res.status(201).json ({
    staus: "success",
    msg: "User Registered successfully",
    dat: user
 })
});

//desc      Login User
//@route    POST /api/v1/users/login
//@access   Public

export const loginUserCtrl = asyncHandler(async(req, res) => {
    const { email, password} = req.body;
    //Find the user in db by email only
    const userFound = await User.findOne({
        email
    });
    console.log("User found from DB:", userFound);
//   console.log("Password entered:", password);


    if(userFound && (await bcrypt.compare(password, userFound?.password))) {
        res.json({
            status: "success",
            message: "User logged in successfully",
            userFound,
            token: generateToken(userFound?._id),
        });
    } else {
        throw new Error('Invalid login credentials');
    }
});

// export const loginUserCtrl = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   // 1. Check for missing fields (optional but recommended)
//   if (!email || !password) {
//     res.status(400);
//     throw new Error('Email and password are required');
//   }

//   // 2. Find the user by email
//   const userFound = await User.findOne({ email });

//   // 3. Compare hashed password
//   if (userFound && (await bcrypt.compare(password, userFound.password))) {
//     res.status(200).json({
//       status: 'success',
//       message: 'User logged in successfully',
//       user: {
//         _id: userFound._id,
//         fullname: userFound.fullname,
//         email: userFound.email,
//         // Don't send the password!
//       },
//     });
//   } else {
//     res.status(401); // Unauthorized
//     throw new Error('Invalid login credentials');
//   }
// });

export const getUserProfileCtrl = asyncHandler(async(req, res)=> {
    const token = getTokenFromHeader(req);
    //Verify Token
    const verified = verifyToken(token);
    console.log(verified);
    console.log(token);
    res.json({
        msg: "Welcome to profile page"
    })
});