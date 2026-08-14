import Airports from "../models/airport.js";
import Countries from "../models/country.js";
import Cities from "../models/city.js";

async function getAirpotByIata(req, res, next) {
  try {
    const { iata_code } = req.params;
      console.log(req.params)
    if (!/^[A-Za-z]{3}$/.test(iata_code)) {
      throw new Error(400, "IATA code must be exactly 3 letters");
    }
    const airports = await Airports.findOne({
      iataCode: iata_code.toUpperCase(),
    }).populate({
      path: "city",
      populate: { path: "country" }, // nested populate = the "join" across all 3 collections
    });

console.log("Findout",airports)

    if (!airports) {
      throw new Error(
        404,
        `No airport found with IATA code ${iata_code.toUpperCase()}`,
      );
    }

    res.status(200).json({ success: true, data: airports });
  } catch (error) {
    console.log(error.message)
    res.status(400).json({
      error: true,
      message: error.message,
    });
  }
}
export { getAirpotByIata };
