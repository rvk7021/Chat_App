import User from "../models/usermodel.js";

export const getUserSideBar=async(req,res)=>{
    
    try {
       const loggedInUserId=req.user._id;
       const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
       res.json(filteredUsers);
    } catch (error) {
        console.log("error in getusersidebar", error.message);
        res.status(500).json({ error: "Server Error" });
    }
}