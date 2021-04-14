const express = require("express");
const Bike = require("../models/bike");
const ShareLocation = require("../models/shareLocation");

const router = new express.Router();

// GET all ShareLocations
router.get("/", async (req, res) => {
  try {
    const shareLocations = await ShareLocation.find();
    res.status(200).send({ shareLocations });
  } catch (error) {
    res.status(500).send({ error });
  }
});

// GET a specific ShareLocation by id
router.get("/:id", async (req, res) => {
  try {
    const shareLocation = await ShareLocation.findOne({ _id: req.params.id }); // throws error if can't find shareLocation with the given id
    res.status(200).send({ shareLocation });
  } catch (error) {
    res.status(404).send({ error });
  }
});

// GET all Bikes at a specific ShareLocation
router.get("/:id/bikes", async (req, res) => {
  try {
    const shareLocation = await ShareLocation.findOne({ _id: req.params.id }); // throws error if can't find shareLocation with the given id
    const bikes = await Bike.find({ bikeDock: shareLocation._id });
    res.status(200).send({ bikes });
  } catch (error) {
    res.status(404).send({ error });
  }
});

// ADD a Bike to a specific ShareLocation
// used a PATCH instead of POST because I am updating the ShareLocation Model
router.patch("/:id/bikes/add", async (req, res) => {
  try {
    const shareLocation = await ShareLocation.findOne({ _id: req.params.id }); // throws error if can't find shareLocation with the given id
    const bike = await Bike.findOne({ _id: req.body.bikeId }); // throws error if can't find bike with shareLocation with the given id
    if (bike.bikeDock !== "") {
      return res.status(404).send({
        error:
          "This Bike has already been docked: a bike cannot be docked more than once",
      });
    }
    bike.bikeDock = shareLocation.id;
    shareLocation.dockCount += 1;
    await bike.save();
    await shareLocation.save();
    return res.status(200).send({ bike });
  } catch (error) {
    res.status(404).send({ error });
  }
});

// REMOVE a Bike from a specific ShareLocation
// used a PATCH instead of POST because I am updating the ShareLocation Model
router.patch("/:id/bikes/remove", async (req, res) => {
  try {
    const shareLocation = await ShareLocation.findOne({ _id: req.params.id }); // throws error if can't find shareLocation with the given id
    const bike = await Bike.findOne({ _id: req.body.bikeId }); // throws error if can't find bike with shareLocation with the given id
    if (bike.bikeDock !== shareLocation._id.toString()) {
      return res.status(404).send({
        error:
          "This Bike is not actually docked at the dock that this request is attempting to remove from",
      });
    }
    bike.bikeDock = "";
    shareLocation.dockCount -= 1;
    await bike.save();
    await shareLocation.save();
    return res.status(200).send({ bike });
  } catch (error) {
    res.status(404).send({ error });
  }
});

// CREATE new ShareLocation
router.post("/", async (req, res) => {
  try {
    if (req.body.dockCount) {
      // a ShareLocation cannot be created with bikes already assigned to it
      req.body.dockCount = 0;
    }
    // database handles validation
    const shareLocation = new ShareLocation(req.body);
    await shareLocation.save();
    console.log("creating new share location:", shareLocation._id);
    res.status(200).send(shareLocation);
  } catch (e) {
    // returns validation errors from database for bad request body
    res.status(500).send({ error: e });
  }
});

// DELETE a ShareLocation by id
router.delete("/:id", async (req, res) => {
  try {
    console.log("deleting share location:", req.params.id);
    await ShareLocation.deleteOne({ _id: req.params.id });
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
