import jwt from "jsonwebtoken";

export const generateToken = async (username, res) => {
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
        throw new Error("Secret key not found in environment variables");
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: '15d' });

    res.cookie("jwt", token, {
        // Cookie options
        maxAge: 15 * 24 * 60 * 60 * 1000,  // 15 days in milliseconds
        httpOnly: true,  // Prevent XSS attacks
        sameSite: "strict",  // CSRF protection
        secure: process.env.NODE_ENV === "production"  // Use 'secure' flag only in production
    });
    console.log("Token stored ");
};

export default generateToken;
