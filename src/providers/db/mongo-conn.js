// const { MongoClient } = require("mongodb");


import {MongoClient} from "mongodb";
const Db = process.env.MONGO_DB_URL;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

export const mongo_conn = {
    connectToServer, getDb
}
// module.exports = {
  function connectToServer(callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        // _db = db.db("myFirstDatabase");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  }

  function getDb() {
    return _db;
  }
// };
