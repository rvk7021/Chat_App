import mongoose from "mongoose";
import User from "./models/usermodel.js";
import dotenv from "dotenv";
import path from "path";

// Resolve the .env file path using process.cwd()
const dotenvPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: dotenvPath });

// Ensure MONGO_DB_URL is correctly set in your .env file
const { MONGO_DB_URL } = process.env;

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Remove useCreateIndex and useFindAndModify options
            useCreateIndex: true, // deprecated
            useFindAndModify: false // deprecated
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

const findUser = async (username) => {
    try {
        const user = await User.findOne({ username }).maxTimeMS(30000);

        if (user) {
            console.log("User found:", user.username);
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.error("Error finding user:", error.message);
    }
};

// Call the function to connect to MongoDB
await connectToMongoDB();

// Example usage to find a user
const usernameToFind = "Phoenix_rvk";
await findUser(usernameToFind);
