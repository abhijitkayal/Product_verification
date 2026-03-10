// const mongoose = require("mongoose");
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  serial: String,
  code: String,
  mfg: String,
  name: String,
  token: String,

  verified: {
    type: Boolean,
    default: false
  },

  verifiedAt: Date
});

// module.exports = mongoose.model("Product", productSchema);
export default mongoose.model("Product", productSchema);