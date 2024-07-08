 import express from "express";
 import authenticated from "../middleware/authenticated.js";
 import { getUserSideBar } from "../controllers/sideUserController.js";
 const router=express.Router()
 
 router.get("/",authenticated,getUserSideBar)

export default router;