const express = require("express");
const Bike = require("../models/bike");

const router = new express.Router();

// CREATE a Bike
router.post("/", async (req, res) => {
  try {
    if (req.body.bikeDock) {
      // a Bike cannot be created already assigned to a Dock
      req.body.bikeDock = "";
    }
    // database handles the rest of validation
    const bike = new Bike(req.body);
    await bike.save();
    console.log("creating new bike:", bike._id);
    res.status(200).send(bike);
  } catch (error) {
    // returns validation errors from database for bad request body
    res.status(500).send({ error });
  }
});

// DELETE a Bike by id
router.delete("/:id", async (req, res) => {
  try {
    console.log("deleting bike:", req.params.id);
    await Bike.deleteOne({ _id: req.params.id });
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
