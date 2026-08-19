import express from "express";
import connectDb from "./config/mongodb.js";
import AirportRouter from "./routes/Airportrouter.js";
import morgan  from "morgan";

const app=express();
app.use(express.json());

app.use(morgan("dev"))
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