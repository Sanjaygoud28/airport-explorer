import mongoose from "mongoose";
import Cities from "./city.js";

const airportSchema = new mongoose.Schema({
  iataCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    minlength: 3,
    maxlength: 3,
  },
  icaoCode: {
    type: String,
    uppercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["large_airport", "medium_airport", "small_airport"],
    default: "medium_airport",
  },
  latitudeDeg: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  longitudeDeg: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
  elevationFt: {
    type: Number,
  },

  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cities",
    required: Cities,
  },
},

{ timestamps: true });

const Airports = mongoose.model("Airports", airportSchema);
export default Airports;
