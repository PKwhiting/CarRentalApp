const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getSingleUser = async (req, res, next) => {
    try {
      const userId = new ObjectId(req.params.id);
      let db = await mongodb.getDb()
      const result = db.db("CarRentalApp").collection('users').find({ _id: userId });
      const lists = await result.toArray();
      if (!lists || lists.length === 0) {
        //return res.status(404).send('User not found');
        
      } else {
        return result;
  
      }
    } catch (error) {
      console.log(error);
      //return res.status(500).json({ error: "Error fetching user" });
    }
  };



module.exports = { getSingleUser };