import Airports from "../models/airport.js";
import Countries from "../models/country.js";
import Cities from "../models/city.js";

async function getAirpotByIata(req, res, next) {
  try {
    const { iata_code } = req.params;
    console.log("request from client", req);
    if (!/^[A-Za-z]{3}$/.test(iata_code)) {
      throw new Error(400, "IATA code must be exactly 3 letters");
    }
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

export { getAirpotByIata, searchAirpotByName };
