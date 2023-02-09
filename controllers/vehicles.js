const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllVehicles = async (req, res, next) => {
  try {
    let db = await mongodb.getDb();
    const result = db.db("CarRentalApp").collection('vehicles').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: "Error fetching vehicles" });
  }
};

const getSingleVehicle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    if (!ObjectId.isValid(userId)) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }
    let db = await mongodb.getDb();
    const result = db.db("CarRentalApp").collection('vehicles').find({ _id: userId });
    const lists = await result.toArray();
    if (!lists[0]) {
      res.status(404).json({ error: "Vehicle not found" });
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching vehicle" });
  }
};

const createNewVehicle = async (req, res) => {
  try {
    const { year, make, model, mileage, remainingRange, currentlyRented, broken } = req.body;
    if (!year || !make || !model || !mileage || remainingRange === undefined || currentlyRented === undefined || broken === undefined) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const contact = { year, make, model, mileage, remainingRange, currentlyRented, broken };
    let db = await mongodb.getDb();
    const result = await db.db("CarRentalApp").collection('vehicles').insertOne(contact);
    res.status(201).json({ _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Error creating new vehicle" });
  }
};
const updateCurrentVehicle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    if (!userId) {
      return res.status(400).send({ error: "Invalid user ID" });
    }

    const { year, make, model, mileage, remainingRange, currentlyRented, broken } = req.body;

    if (!year || !make || !model || !mileage || !remainingRange || typeof currentlyRented === "undefined" || typeof broken === "undefined") {
      return res.status(400).send({ error: "All fields are required" });
    }

    const update = {
      $set: {
        year: year,
        make: make,
        model: model,
        mileage: mileage,
        remainingRange: remainingRange,
        currentlyRented: currentlyRented,
        broken: broken
      }
    };

    let db = await mongodb.getDb();
    const vehicle = await db.db("CarRentalApp").collection("vehicles").findOne({ _id: userId });
    if (!vehicle) {
      return res.status(404).send({ error: "Vehicle not found" });
    }

    const result = await db.db("CarRentalApp").collection("vehicles").updateOne({ _id: userId }, update);
    if (result.modifiedCount > 0) {
      return res.status(204).send();
    } else {
      return res.status(404).send({ error: "Vehicle not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error updating vehicle" });
  }
};

const deleteCurrentVehicle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    if (!userId) {
      return res.status(400).send({ error: "Invalid user ID" });
    }

    let db = await mongodb.getDb();
    const result = await db.db("CarRentalApp").collection("vehicles").deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
      return res.status(200).send();
    } else {
      return res.status(404).send({ error: "Vehicle not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Error deleting vehicle" });
  }
};

module.exports = { getAllVehicles, getSingleVehicle, createNewVehicle, updateCurrentVehicle, deleteCurrentVehicle };