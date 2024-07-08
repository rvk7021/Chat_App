// backend/controllers/authControllers.js
import bcryptjs from "bcryptjs";
import User from "../models/usermodel.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import generateToken from "../authentication/tokenGeneration.js";
import { compare } from "../function/require.js";

export const signUp = async (req, res) => {
   try{
    // try part begins 
    const {fullname,username,password,confirmpassword,gender}=req.body;

    if(password!=confirmpassword){
        return res.status(400).json({error:"password do not match"})
    }
    const user=await User.findOne({username});
    
    if(user){
        return res.status(400).json({error:"User Already Exists"});
    }
    
    const boyProfilePic=`https://avatar-placeholder.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic=`https://avatar-placeholder.iran.liara.run/public/girl?username=${username}`
    // hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt)

    // creating new user 
    const newUser=new User({
        fullname,
        username,
        password:hashedPassword,
        gender,
        profilePic:gender==="male"?boyProfilePic:girlProfilePic
    })
    
    // if newuser created then adding them to the data base
    if(newUser){
        generateToken(newUser._id,res)
        await newUser.save()
        res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullname,
            username:newUser.username,
            profilePic:newUser.profilePic
        })
    }
    else
    {
        res.status(400).json({error:"invalid user data"});
    }
    
   }
   catch (error) {
    // error part if signupfaces error
    console.error("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
  
};


export const login = async (req, res) => {

try {
    const username={username:req.body.username};
    const password=req.body.password;
    const user=await User.findOne(username);
    console.log(username)
    const isCorrectPassword=await user.password==password;
    console.log(isCorrectPassword)
    if (!isCorrectPassword || !user) {
        return res.status(400).json({ error: "Invalid Username or Password" });
    }

    generateToken(user._id, res);

    res.status(201).json({
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        profilePic: user.profilePic
    });
       } 
   catch (error) {
    console.error("Error in login controller", error.message);
    res.status(500).json({ error: "Server error" });
}

};


export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
        });

        res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Error in logout controller", error.message);
        res.status(500).json({ error: "Server error" });
    }

};
