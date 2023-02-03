const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;



const getAllUsers = async (req, res, next) => {
  let db = await mongodb.getDb()
  const result = db.db("CarRentalApp").collection('users').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};


const getSingleUser = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  let db = await mongodb.getDb()
  const result = db.db("CarRentalApp").collection('users').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};


const createNewUser = async (req, res) => {
  try {
    const { firstName, lastName, username, password, hoursRemaining } = req.body;
    const contact = { firstName, lastName, username, password, hoursRemaining };
    let db = await mongodb.getDb();
    const result = await db.db("CarRentalApp").collection('users').insertOne(contact);
    res.status(201).json({ _id: result.insertedId });
  } catch (error) {
    res.status(500).json(error).send();
  }
};


/*  const updateCurrentContact = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const update = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
      }
    };
    try {
      let db = await mongodb.getDb()
      const contact = await db.db("CSE341-NODE").collection('Contacts').findOne({ _id: userId });
      if(!contact){
        res.status(404).send('Contact not found');
      }else{
        const result = await db.db("CSE341-NODE").collection('Contacts').updateOne({ _id: userId }, update);
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
          res.status(404).send('Contact not found');
        }
    }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error updating contact" });
    }
  };

  const deleteCurrentContact = async (req, res) => {
    try {
      const userId = new ObjectId(req.params.id);
      let db = await mongodb.getDb()
      const result = await db.db("CSE341-NODE").collection('Contacts').deleteOne({ _id: userId });
      if (result.deletedCount > 0) {
        res.status(200).send();
      } else {
        res.status(404).send('Contact not found');
      }
    } catch (err) {
      res.status(500).json(err.message || 'Some error occurred while deleting the contact.');
    }
  };*/
module.exports = { getAllUsers, getSingleUser, createNewUser };