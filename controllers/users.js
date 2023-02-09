const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;



const getAllUsers = async (req, res, next) => {
  try {
    let db = await mongodb.getDb()
    const result = db.db("CarRentalApp").collection('users').find();
    const lists = await result.toArray();
    if (!lists) {
      res.status(404).send('No users found');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching users" });
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    let db = await mongodb.getDb()
    const result = db.db("CarRentalApp").collection('users').find({ _id: userId });
    const lists = await result.toArray();
    if (!lists || lists.length === 0) {
      res.status(404).send('User not found');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching user" });
  }
};

const createNewUser = async (req, res) => {
  try {
    const { firstName, lastName, username, password, hoursRemaining } = req.body;
    if (!firstName || !lastName || !username || !password || !hoursRemaining) {
      return res.status(400).send("Bad Request: missing required fields");
    }
    const contact = { firstName, lastName, username, password, hoursRemaining };
    let db = await mongodb.getDb();
    const result = await db.db("CarRentalApp").collection('users').insertOne(contact);
    res.status(201).json({ _id: result.insertedId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating user" });
  }
};

const updateCurrentUser = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!ObjectId.isValid(userId)) {
      res.status(400).send("Invalid user ID");
      return;
    }

    const { firstName, lastName, username, password, hoursRemaining } = req.body;
    if (!firstName || !lastName || !username || !password || !hoursRemaining) {
      res.status(400).send("Bad Request: All fields are required");
      return;
    }

    const update = {
      $set: {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        hoursRemaining: hoursRemaining
      }
    };
    
    let db = await mongodb.getDb();
    const contact = await db.db("CarRentalApp").collection('users').findOne({ _id: new ObjectId(userId) });
    if (!contact) {
      res.status(404).send("User not found");
      return;
    }

    const result = await db.db("CarRentalApp").collection('users').updateOne({ _id: new ObjectId(userId) }, update);
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating user" });
  }
};

const deleteCurrentUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
      res.status(400).send("Invalid user ID");
      return;
    }

    let db = await mongodb.getDb();
    const result = await db.db("CarRentalApp").collection('users').deleteOne({ _id: new ObjectId(userId) });
    if (result.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting user" });
  }
};

module.exports = { getAllUsers, getSingleUser, createNewUser, updateCurrentUser, deleteCurrentUser };