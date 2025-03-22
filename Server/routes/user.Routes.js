import express from "express";
import { getUserdata } from "../controllers/user.controller.js";
import userAuth from "../middleware/user.Auth.js";
const userRouter = express.Router();


userRouter.get('/data',userAuth,getUserdata)


export default userRouter