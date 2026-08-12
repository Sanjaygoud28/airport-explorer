import express from "express";
import connectDb from "./config/mongodb.js";

const app=express();
app.use(express.json());
const PORT = 8000;


app.get("/", (req, res) => {
  res.send("Server is running successfully");
});
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