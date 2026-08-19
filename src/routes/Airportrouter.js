import express from "express";
import { createAirports, getAirpotByIata, searchAirpotByName ,} from "../controllers/AirpotControleer.js";
import { getAirports } from "../controllers/AirpotControleer.js";
const AirportRouter =express.Router()

AirportRouter.get("/search",searchAirpotByName)
AirportRouter.get("/:iata_code",getAirpotByIata)

AirportRouter.get("/",getAirports)
AirportRouter.post("/",createAirports)
export default AirportRouter;