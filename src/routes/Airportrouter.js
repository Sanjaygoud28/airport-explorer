import express from "express";
import { createAirports, getAirpotByIata, searchAirpotByName ,} from "../controllers/AirpotControleer.js";
import { getAirports } from "../controllers/AirpotControleer.js";
const AirportRouter =express.Router()



// ---------- PUBLIC routes — no login required ----------
AirportRouter.get("/search",searchAirpotByName)
AirportRouter.get("/:iata_code",getAirpotByIata)
AirportRouter.get("/",getAirports)


// ---------- ADMIN-ONLY routes — must be logged in AND have role "admin" ----------
// verifyAccessToken  -> "are you logged in?"
// requireAdmin -> "are you an admin?" (runs only if protect already passed)
AirportRouter.post("/",createAirports)
export default AirportRouter;