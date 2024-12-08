const express = require("express");
const router = express.Router();
const Trip = require("../models/trip");



//Create avec POST ==> Ajouter un nouveau voyage
router.post("/", async (req, res) => {
  try {
    const trip = new Trip(req.body);
    const savedTrip = await trip.save(); // Utilise .save() pour un seul document
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(400).json({ message: "Failed to create Trip", error: error.message });
  }
});

//Post ==> Ajout many trips
router.post("/bulk", async (req, res) => {
  try {
    const trips = req.body; // On suppose que le body est un tableau
    if (!Array.isArray(trips)) {
      return res.status(400).json({ message: "Data must be an array of trips" });
    }
    const savedTrips = await Trip.insertMany(trips); // Insère plusieurs documents en une seule opération
    res.status(201).json(savedTrips); // Retourne les voyages sauvegardés
  } catch (error) {
    res.status(400).json({ message: "Failed to create trips", error: error.message });
  }
});


// **Get all trips or filter by destination**
router.get("/", async (req, res) => {
  const destination = req.query.destination;

  try {
    let trips;
    if (destination) {
      trips = await Trip.find({
        destination: { $regex: new RegExp(destination.trim(), "i") },
      });
    } else {
      trips = await Trip.find();
    }
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trips", error: error.message });
  }
});
// GET by trip's ID ==> Read trip by id
router.get("/:id", async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id);
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trip", error: error.message });
    }
  });

  // UPDATE ==> Update a trip
router.put("/:id", async (req, res) => {
    try {
      const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedTrip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      res.status(200).json(updatedTrip);
    } catch (error) {
      res.status(400).json({ message: "Failed to update trip", error: error.message });
    }
  });
  
  // DELETE ==> Delete trip 
  router.delete("/:id", async (req, res) => {
    try {
      const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
      if (!deletedTrip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      res.status(200).json({ message: "Trip deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete trip", error: error.message });
    }
  });
  
  module.exports = router;
