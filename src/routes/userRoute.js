import express from "express";
import {createUser, getMyProfile, getUser, getUserById, loginUser, logout, refreshAccessToken} from "../controllers/userController.js"
const userRouter=express.Router();
import { verifyAccessToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";

userRouter.post("/register",validate(createUserSchema),createUser)
userRouter.post("/login",verifyAccessToken,loginUser)
userRouter.get("/logout",verifyAccessToken,logout)
userRouter.get("/auth/refresh",refreshAccessToken)

export default userRouter;