const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userImage: {
    type: String,
  },
  userFullName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    unique: true,
    required: true,
  },
  userPhone: {
    type: Number,
    unique: true,
    required: true,
  },
  bankId: {
    type: mongoose.Types.ObjectId,
    ref: "bank",
  },
  userCity: {
    type: String,
    required: true,
  },
  userState: {
    type: String,
    required: true,
  },
  userFullAddress: {
    type: String,
    required: true,
  },
  userCountry: {
    type: String,
    required: true,
  },
  userPostalCode: {
    type: Number,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userBankAccountNo: {
    type: Number,
    unique: true,
    required: true,
  },
  userBankWalletAddress: {
    type: Number,
    unique: true,
    required: true,
  },
  userCurrentAmount: {
    type: Number,
    required: true,
  },
  userTransactionLimit: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
userSchema.set("timestamps", true);

module.exports = mongoose.model("user", userSchema);
