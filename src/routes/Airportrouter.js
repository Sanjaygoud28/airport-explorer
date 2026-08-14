import express from "express";
import { getAirpotByIata } from "../controllers/AirpotControleer.js";

const AirportRouter =express.Router()

AirportRouter.get("/:iata_code",getAirpotByIata)

export default AirportRouter;