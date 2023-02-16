const mongodb = require('../db/connect');
const { use } = require('../routes/account');
const ObjectId = require('mongodb').ObjectId;





const getSingleUser = async (req, res, next) => {
    try {
      const userId = new ObjectId(req.params.id);
      let db = await mongodb.getDb()
      const result = db.db("CarRentalApp").collection('users').find({ _id: userId });
      const lists = await result.toArray();
      if (!lists || lists.length === 0) {
        
      } else {
        return lists;
  
      }
    } catch (error) {
      console.log(error);
    }
  };






  const updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
      if (!ObjectId.isValid(userId)) {
        console.log("Invalid user ID");
        return;
      }
  
      const { firstName, lastName, username, password } = req.body;
      if (!firstName || !lastName || !username || !password) {
        console.log("Bad Request: All fields are required");
        return;
      }
  
      const update = {
        $set: {
          first_name: firstName,
          last_name: lastName,
          username: username,
          password: password
        }
      };
  
      let db = await mongodb.getDb();
      const contact = await db.db("CarRentalApp").collection('users').findOne({ _id: new ObjectId(userId) });
      if (!contact) {
        console.log("User not found");
        return;
      }
  
      const result = await db.db("CarRentalApp").collection('users').updateOne({ _id: new ObjectId(userId) }, update);
      if (result.modifiedCount > 0) {
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  


module.exports = { getSingleUser, updateUser };