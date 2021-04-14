const mongoose = require("mongoose");

const shareLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    // Address validation could be added
    type: String,
    required: true,
    unique: true,
  },
  dockCount: {
    type: Number,
    default: 0,
  },
});

const ShareLocation = mongoose.model("ShareLocation", shareLocationSchema);

module.exports = ShareLocation;
