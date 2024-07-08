import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';

const authenticated = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; 
        if (!token) {
            return res.status(401).json("You are not authorized");
        }
        
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json("Unauthorized to send the message");
        }

        const user = await User.findById(decode.username).select("-password");
       
        if (!user) {
            return res.status(401).json("User Not Found");
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("error in authenticated middleware", error.message); // Corrected error.Message to error.message
        res.status(400).json({ error: "Internal Server Error" });
    }
};

export default authenticated;
