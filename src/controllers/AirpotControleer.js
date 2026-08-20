import Airports from "../models/airport.js";
import Countries from "../models/country.js";
import Cities from "../models/city.js";
import { getFromCache,setInCache } from "../utils/cache.js";
async function getAirpotByIata(req, res, next) {
  try {
    const { iata_code } = req.params;
    // console.log("request from client", req);
    if (!/^[A-Za-z]{3}$/.test(iata_code)) {
      throw new Error(400, "IATA code must be exactly 3 letters");
    }

    const code = iata_code.toUpperCase();
    const cacheKey = `airport:${code}`;

    console.log("downwards,,let see")
    // 1. Check cache first — skip the DB entirely on a hit
    const cached = getFromCache(cacheKey);  //function called
    if (cached) {
      
      console.log(`first time Cache HIT for ${code}`);
      return res.status(200).json(cached);
    }

    console.log(`Cache MISS for ${code} — querying MongoDB`);

    
    // 2. Cache miss — query MongoDB as usual
    const airports = await Airports.findOne({
      iataCode: iata_code.toUpperCase(),
    }).populate({
      path: "city",
      populate: { path: "country" }, // nested populate = the "join" across all 3 collections
    });

    console.log("Findout", airports);

    if (!airports) {
      throw new Error(
        404,
        `No airport found with IATA code ${iata_code.toUpperCase()}`,
      );
    }
    // 3. Store in cache for next time

    setInCache(cacheKey, airports);  // function called
    res.status(200).json({ success: true, data: airports });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: true,
      message: error.message,
    });
  }
}

async function searchAirpotByName(req, res, next) {
  try {
    console.log("1. Controller called");
    console.log("2. Query:", req.query);

    const { name } = req.query;
    console.log("3. Search name:", name);

    if (!name || name.trim().length < 2) {
      throw new Error("Please provide at least 2 characters to search");
    }

    const airports = await Airports.find({
      name: { $regex: name.trim(), $options: "i" },
    }).limit(10);

    console.log("4. Database result:", airports);
    if (airports.length === 0) {
      throw new Error(`No airports found matching "${name}"`);
    }
    res.status(200).json({
      success: true,
      count: airports.length,
      message: "suucesfully fetched",
      data: airports.map((a) => ({
        iata_code: a.iataCode,
        icao_code: a.icaoCode,
        name: a.name,
        type: a.type,
      })),
    });
  } catch (error) {
    console.log("following", error.message);
    res.status(400).json({
      error: true,
      message: error.message,
    });
  }
}

async function getAirports(req, res, next) {
  try {
    const { type, page = 1, limit = 10 } = req.query;

    const query = {};

    console.log("inside query 123", query);
    if (type) query.type = type;
    console.log("inside query", query);

    const airports = await Airports.find(query).populate({
      path: "city",
      populate: { path: "country" },
    });

    const total = airports.length;
    const start = (page - 1) * limit;
    const paginated = airports.slice(start, start + Number(limit));

    res.status(200).json({
      success: true,
      count: paginated.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: paginated,
    });
  } catch (error) {
    console.log("following", error.message);
    res.status(400).json({
      error: true,
      message: error.message,
    });
  }
}

// @route   POST /api/airports
async function createAirports(req, res, next) {
  try {
    const data = req.body;
    const airport = await Airports.create(req.body);
    res.status(201).json({
      success: true,
      data: airport,
    });
    console.log(airport);
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message,
    });
  }
}

export { getAirpotByIata, searchAirpotByName, getAirports, createAirports };
