import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDb from "./config/mongodb.js";
import AirportRouter from "./routes/Airportrouter.js";
import morgan  from "morgan";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import CityRoutes from "./routes/CityRoutes.js";



const app=express();
app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://airport-explorer-frontend.vercel.app"
];

// CORS options
 const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(morgan("dev"))
app.use("/airports", apiLimiter);
app.use("/users", userRouter);
app.use("/airports",AirportRouter)
app.use("/Cities", CityRoutes);

const PORT = process.env.PORT || 5000;

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
