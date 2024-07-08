import express from "express";
import { sendMessage,getMessages } from "../controllers/messageController.js";
import authenticated from "../middleware/authenticated.js";
const router=express.Router();

router.get("/send/:id",authenticated,getMessages);
router.post("/send/:id",authenticated,sendMessage)
export default router;