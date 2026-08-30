import express from "express";
import { createAdmin, loginUser, logout, refreshAccessToken,signupUser} from "../controllers/UserController.js"
const userRouter=express.Router();
import { verifyAccessToken,requireAdmin } from "../middlewares/auth.js";
// import { validate } from "../middlewares/validate.js";

userRouter.post("/signup",signupUser)
userRouter.post("/login",loginUser)
userRouter.post("/refresh",refreshAccessToken)
userRouter.post("/logout",verifyAccessToken,logout)
userRouter.post("/create-admin",verifyAccessToken, requireAdmin, createAdmin);  // ← new
export default userRouter;