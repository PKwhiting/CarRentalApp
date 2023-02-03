const dotenv = require('dotenv')
dotenv.config();
let uri = process.env['MONGODB_URI'];
const MongoClient = require('mongodb').MongoClient;
 async function initDb(uri) {
  let mongoClient;
  
  try {
      mongoClient = new MongoClient(uri);
      console.log('Connecting to MongoDB Atlas cluster...');
      await mongoClient.connect();
      console.log('Successfully connected to MongoDB Atlas!');
      return mongoClient;
  } catch (error) {
      console.error('Connection to MongoDB Atlas failed!', error);
      process.exit();
  }
}
let mongoClient = initDb(uri);

const getDb = () => {
  if (!initDb(uri)) {
    throw Error('Db not initialized');
  }
  return initDb(uri);
};
module.exports = {
  initDb,
  getDb,
};



