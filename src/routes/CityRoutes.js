import express from "express";
import { getcities } from "../controllers/AirpotControleer.js";

const CityRoutes = express.Router()

CityRoutes.get("/",getcities)

export default CityRoutes