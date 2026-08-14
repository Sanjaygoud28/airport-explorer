import mongoose from "mongoose";
import dotenv from "dotenv";
import Countries from "../models/country.js";
import Cities from "../models/city.js";
import Airports from "../models/airport.js";

import connectDb from "../config/mongodb.js";

const Seeddata = async () => {
  try {
    await connectDb();
    console.log("MongoDb connected for seeding");

    await Airports.deleteMany({});
    await Cities.deleteMany({});
    await Countries.deleteMany({});
    console.log("Old data cleared");

    // ---------- COUNTRIES ----------
    const india = await Countries.create({
      name: "India",
      countryCodeTwo: "IN",
      CountryCodeThree: "IND",
      mobileCode: 91,
      continentId: 1,
    });

    const usa = await Countries.create({
      name: "United States",
      countryCodeTwo: "US",
      CountryCodeThree: "USA",
      mobileCode: 1,
      continentId: 4,
    });

    const uae = await Countries.create({
      name: "United Arab Emirates",
      countryCodeTwo: "AE",
      CountryCodeThree: "ARE",
      mobileCode: 971,
      continentId: 1,
    });

    const uk = await Countries.create({
      name: "United Kingdom",
      countryCodeTwo: "GB",
      CountryCodeThree: "GBR",
      mobileCode: 44,
      continentId: 3,
    });

    const singapore = await Countries.create({
      name: "Singapore",
      countryCodeTwo: "SG",
      CountryCodeThree: "SGP",
      mobileCode: 65,
      continentId: 1,
    });

    // / ---------- CITIES ----------
    const agra = await Cities.create({
      name: "Agra",
      country: india._id,
      isActive: true,
      lat: 27.18,
      long: 78.02,
    });
    const hyderabad = await Cities.create({
      name: "Hyderabad",
      country: india._id,
      isActive: true,
      lat: 17.385,
      long: 78.4867,
    });
    const mumbai = await Cities.create({
      name: "Mumbai",
      country: india._id,
      isActive: true,
      lat: 19.076,
      long: 72.8777,
    });
    const delhi = await Cities.create({
      name: "Delhi",
      country: india._id,
      isActive: true,
      lat: 28.7041,
      long: 77.1025,
    });
    const bengaluru = await Cities.create({
      name: "Bengaluru",
      country: india._id,
      isActive: true,
      lat: 12.9716,
      long: 77.5946,
    });
    const chennai = await Cities.create({
      name: "Chennai",
      country: india._id,
      isActive: true,
      lat: 13.0827,
      long: 80.2707,
    });

    const newYork = await Cities.create({
      name: "New York",
      country: usa._id,
      isActive: true,
      lat: 40.7128,
      long: -74.006,
    });
    const losAngeles = await Cities.create({
      name: "Los Angeles",
      country: usa._id,
      isActive: true,
      lat: 34.0522,
      long: -118.2437,
    });

    const dubai = await Cities.create({
      name: "Dubai",
      country: uae._id,
      isActive: true,
      lat: 25.2048,
      long: 55.2708,
    });
    const london = await Cities.create({
      name: "London",
      country: uk._id,
      isActive: true,
      lat: 51.5072,
      long: -0.1276,
    });
    const singaporeCity = await Cities.create({
      name: "Singapore",
      country: singapore._id,
      isActive: true,
      lat: 1.3521,
      long: 103.8198,
    });

    // / City with NO country reference — tests the spec's "return null for country" requirement
    const unknownCity = await Cities.create({
      name: "Unmapped City",
      country: null,
      isActive: true,
      lat: 0,
      long: 0,
    });

    // ---------- AIRPORTS ----------
    await Airports.create({
      iataCode: "AGR",
      icaoCode: "VIAG",
      name: "Agra Airport / Agra Air Force Station",
      type: "medium_airport",
      latitudeDeg: 27.157683,
      longitudeDeg: 77.960942,
      elevationFt: 551,
      city: agra._id,
    });

    await Airports.create({
      iataCode: "HYD",
      icaoCode: "VOHS",
      name: "Rajiv Gandhi International Airport",
      type: "large_airport",
      latitudeDeg: 17.2403,
      longitudeDeg: 78.4294,
      elevationFt: 2024,
      city: hyderabad._id,
    });

    await Airports.create({
      iataCode: "BOM",
      icaoCode: "VABB",
      name: "Chhatrapati Shivaji Maharaj International Airport",
      type: "large_airport",
      latitudeDeg: 19.0896,
      longitudeDeg: 72.8656,
      elevationFt: 39,
      city: mumbai._id,
    });

    await Airports.create({
      iataCode: "DEL",
      icaoCode: "VIDP",
      name: "Indira Gandhi International Airport",
      type: "large_airport",
      latitudeDeg: 28.5562,
      longitudeDeg: 77.1,
      elevationFt: 777,
      city: delhi._id,
    });

    await Airports.create({
      iataCode: "BLR",
      icaoCode: "VOBL",
      name: "Kempegowda International Airport",
      type: "large_airport",
      latitudeDeg: 13.1979,
      longitudeDeg: 77.7063,
      elevationFt: 3000,
      city: bengaluru._id,
    });

    await Airports.create({
      iataCode: "MAA",
      icaoCode: "VOMM",
      name: "Chennai International Airport",
      type: "large_airport",
      latitudeDeg: 12.9941,
      longitudeDeg: 80.1709,
      elevationFt: 52,
      city: chennai._id,
    });

    await Airports.create({
      iataCode: "JFK",
      icaoCode: "KJFK",
      name: "John F. Kennedy International Airport",
      type: "large_airport",
      latitudeDeg: 40.6413,
      longitudeDeg: -73.7781,
      elevationFt: 13,
      city: newYork._id,
    });

    await Airports.create({
      iataCode: "LAX",
      icaoCode: "KLAX",
      name: "Los Angeles International Airport",
      type: "large_airport",
      latitudeDeg: 33.9416,
      longitudeDeg: -118.4085,
      elevationFt: 125,
      city: losAngeles._id,
    });

    await Airports.create({
      iataCode: "DXB",
      icaoCode: "OMDB",
      name: "Dubai International Airport",
      type: "large_airport",
      latitudeDeg: 25.2532,
      longitudeDeg: 55.3657,
      elevationFt: 62,
      city: dubai._id,
    });

    await Airports.create({
      iataCode: "LHR",
      icaoCode: "EGLL",
      name: "London Heathrow Airport",
      type: "large_airport",
      latitudeDeg: 51.47,
      longitudeDeg: -0.4543,
      elevationFt: 83,
      city: london._id,
    });

    await Airports.create({
      iataCode: "SIN",
      icaoCode: "WSSS",
      name: "Singapore Changi Airport",
      type: "large_airport",
      latitudeDeg: 1.3644,
      longitudeDeg: 103.9915,
      elevationFt: 22,
      city: singaporeCity._id,
    });

    // Airport linked to a city with NO country — validates spec's null-handling requirement
    await Airports.create({
      iataCode: "ZZZ",
      icaoCode: "ZZZZ",
      name: "Test Airport (No Country Data)",
      type: "small_airport",
      latitudeDeg: 0,
      longitudeDeg: 0,
      elevationFt: 0,
      city: unknownCity._id,
    });

    console.log(
      "Seed data inserted: 5 countries, 12 cities, 12 airports (including 1 null-country test case)",
    );
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

Seeddata()