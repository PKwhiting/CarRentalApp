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
module.exports = { getAllVehicles, getSingleVehicle, createNewVehicle };