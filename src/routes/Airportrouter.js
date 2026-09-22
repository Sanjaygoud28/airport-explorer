import express from "express";
import { createAirports, DeleteAirport, getAirpotByIata, searchAirpotByName ,} from "../controllers/AirpotControleer.js";
import { getAirports } from "../controllers/AirpotControleer.js";
import { UpdateAirport} from "../controllers/AirpotControleer.js";
// import { DeleteAirport } from "../controllers/AirpotControleer.js";
import { verifyAccessToken ,requireAdmin} from "../middlewares/auth.js";
const AirportRouter =express.Router()



// ---------- PUBLIC routes — no login required ----------
AirportRouter.get("/search",searchAirpotByName)
AirportRouter.get("/:iata_code",getAirpotByIata)
AirportRouter.get("/",getAirports)
// AirportRouter.get("/",getcities)



// ---------- ADMIN-ONLY routes — must be logged in AND have role "admin" ----------
// verifyAccessToken  -> "are you logged in?"
// requireAdmin -> "are you an admin?" (runs only if protect already passed)
AirportRouter.post("/",verifyAccessToken,requireAdmin,createAirports)
AirportRouter.put("/:id",verifyAccessToken,requireAdmin,UpdateAirport)
AirportRouter.delete("/:id",verifyAccessToken,requireAdmin,DeleteAirport)
export default AirportRouter;