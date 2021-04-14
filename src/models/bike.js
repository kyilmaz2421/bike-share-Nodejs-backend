const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  manufactureDate: {
    // converts year/month/day string to a proper date
    type: Date,
    required: true,
  },
  serialNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  // shareLocation Object id - this could have also been done by linking the collections internall with mongoDB
  // i.e  {type: mongoose.Schema.Types.ObjectId, ref: "ShareLocation"})
  bikeDock: {
    type: String,
    default: "",
  },
});

const Bike = mongoose.model("Bike", bikeSchema);

module.exports = Bike;
