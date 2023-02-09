const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllVehicles = async (req, res, next) => {
    let db = await mongodb.getDb()
    const result = db.db("CarRentalApp").collection('vehicles').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingleVehicle = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    let db = await mongodb.getDb()
    const result = db.db("CarRentalApp").collection('vehicles').find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createNewVehicle = async (req, res) => {
    try {
      const { year, make, model, mileage, remainingRange, currentlyRented, broken } = req.body;
      const contact = { year, make, model, mileage, remainingRange, currentlyRented, broken };
      let db = await mongodb.getDb();
      const result = await db.db("CarRentalApp").collection('vehicles').insertOne(contact);
      res.status(201).json({ _id: result.insertedId });
    } catch (error) {
      res.status(500).json(error).send();
    }
  };
  const updateCurrentVehicle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const { year, make, model, mileage, remainingRange, currentlyRented, broken } = req.body;
    const update = {
      $set: {
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        mileage: req.body.mileage,
        remainingRange: req.body.remainingRange,
        currentlyRented: req.body.currentlyRented,
        broken: req.body.broken
      }
    };
    try {
      let db = await mongodb.getDb()
      const vehicle = await db.db("CarRentalApp").collection('vehicles').findOne({ _id: userId });
      if(!vehicle){
        res.status(404).send('Vehicle not found');
      }else{
        const result = await db.db("CarRentalApp").collection('vehicles').updateOne({ _id: userId }, update);
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
          res.status(404).send('Vehicle not found');
        }
    }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error updating vehicle" });
    }
  };

  const deleteCurrentVehicle = async (req, res) => {
    try {
      const userId = new ObjectId(req.params.id);
      let db = await mongodb.getDb()
      const result = await db.db("CarRentalApp").collection('vehicles').deleteOne({ _id: userId });
      if (result.deletedCount > 0) {
        res.status(200).send();
      } else {
        res.status(404).send('User not found');
      }
    } catch (err) {
      res.status(500).json(err.message || 'Some error occurred while deleting the user.');
    }
  };
module.exports = { getAllVehicles, getSingleVehicle, createNewVehicle, updateCurrentVehicle, deleteCurrentVehicle };