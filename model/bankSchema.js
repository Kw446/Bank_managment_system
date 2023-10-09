const mongoose = require("mongoose");

const bankSchema = mongoose.Schema({
  bankLogo: {
    type: String,
  },
  bankName: {
    type: String,
    unique: true,
    required: true,
  },
  bankEmail: {
    type: String,
    unique: true,
    required: true,
  },
  bankPassword: {
    type: String,
    required: true,
  },
  bankPhone: {
    type: Number,
    unique: true,
    required: true,
  },
  bankCity: {
    type: String,
    required: true,
  },
  bankState: {
    type: String,
    required: true,
  },
  bankFullAddress: {
    type: String,
    required: true,
  },
  bankCountry: {
    type: String,
    required: true,
  },
  bankPostalCode: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
bankSchema.set("timestamps", true);

module.exports = new mongoose.model("bank", bankSchema);
