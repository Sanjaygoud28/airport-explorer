import express from "express";
import connectDb from "./config/mongodb.js";
import AirportRouter from "./routes/Airportrouter.js";
import morgan  from "morgan";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

const app=express();
app.use(cookieParser());
app.use(express.json());

app.use(morgan("dev"))
app.use("/Airports", apiLimiter);
app.use("/users", userRouter);
const PORT = 8000;

app.use("/Airports",AirportRouter)
// app.get("/", (req, res) => {
//   res.send("Server is running successfully");
// });
async function startBackendApplication(){
    await connectDb();
    startHttpServer()
}
function startHttpServer(){
    app.listen(PORT, async() => {
            console.log("Server is running!", PORT)
            console.log(`http://localhost:${PORT}`)
    })
}


startBackendApplication();