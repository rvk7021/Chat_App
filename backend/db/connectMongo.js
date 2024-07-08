import mongoose, { mongo } from "mongoose";
const connectToMongoDB=async()=>{
    try
    {
        await mongoose.connect(process.env.MONGO_DB_URL,)
        console.log("connected to db");
    }
    catch(error)
    {
        console.log("Error occured during connection",error.message);
    }
};
export default connectToMongoDB;