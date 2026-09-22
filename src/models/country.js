import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
    {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  countryCodeTwo: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    minlength: 2,
    maxlength: 2,
  },
  CountryCodeThree: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    minlength: 3,
    maxlength: 3,
  },
  mobileCode: {
    type: Number,
  },

  continentId: {
    type: Number,
  },
},
{
  timestamps: true
}

);

const Countries = mongoose.model("Countries", countrySchema);
export default Countries;
