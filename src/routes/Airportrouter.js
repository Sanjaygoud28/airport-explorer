import express from "express";
import { getAirpotByIata, searchAirpotByName } from "../controllers/AirpotControleer.js";

const AirportRouter =express.Router()

// AirportRouter.get("/:iata_code",getAirpotByIata)
AirportRouter.get("/search",searchAirpotByName)
export default AirportRouter;