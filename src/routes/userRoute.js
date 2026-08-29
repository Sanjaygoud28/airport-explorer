import express from "express";
import { loginUser, logout, refreshAccessToken,signupUser} from "../controllers/UserController.js"
const userRouter=express.Router();
import { verifyAccessToken } from "../middlewares/auth.js";
// import { validate } from "../middlewares/validate.js";

userRouter.post("/signup",signupUser)
userRouter.post("/login",loginUser)
userRouter.post("/refresh",refreshAccessToken)
userRouter.post("/logout",verifyAccessToken,logout)

export default userRouter;