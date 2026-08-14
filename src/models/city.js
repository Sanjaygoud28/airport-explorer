import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Countries",
      required: false,
    },
    latitudeDeg: {
      type: Number,
      // required: true,
      min: -90,
      max: 90,
    },
    longitudeDeg: {
      type: Number,
      // required: true,
      min: -180,
      max: 180,
    },
  },
  { timestamps: true },
);

const Cities = mongoose.model("Cities", citySchema);

export default Cities;
