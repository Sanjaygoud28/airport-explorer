import express from "express";
import { loginUser, logout, refreshAccessToken,signupUser} from "../controllers/UserController.js"
const userRouter=express.Router();
import { verifyAccessToken } from "../middlewares/auth.js";
// import { validate } from "../middlewares/validate.js";

userRouter.post("/signup",signupUser)
userRouter.post("/login",loginUser)
userRouter.get("/logout",verifyAccessToken,logout)
userRouter.get("/auth/refresh",refreshAccessToken)

export default userRouter;