import Message from "../models/message.js";
import Conversation from "../models/conversation.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;  // Extract message from request body
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(),newMessage.save()])
        res.status(200).json({
            message: newMessage
        });
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(400).json({ error: "Failed to send message" });
    }
};

export const getMessages= async (req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;
        const conversation= await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages")
        
        if(!conversation)
            res.status(200).json([])
        const messages=conversation.messages;
        res.json(messages)
        
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(400).json({ error: "Failed to send message" });
    }
}