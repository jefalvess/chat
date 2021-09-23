const { MongoClient } = require('mongodb')

const PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD); 

const USER = encodeURIComponent(process.env.MONGO_USER); 

const url = `mongodb://${USER}:${PASSWORD}@mongodb.guiaebookonline.com.br/${USER}`

const client = new MongoClient(url)

const dbName = USER

client.connect();

const db = client.db(dbName)

const collection = db.collection('documents')

module.exports = {
    query(query) {
      return new Promise(async (resolve, reject) => {
        try {
          resolve(await collection.find(query).toArray())
        } catch (error) {
          reject(error);
        }
      });
    },
    insertDocument(doc) {
      return new Promise(async (resolve, reject) => {
        try {
          resolve(await collection.insertMany(doc))
        } catch (error) {
          reject(error);
        }
      });
    },
    updateDocument(antigo, novo) {
      return new Promise(async (resolve, reject) => {
        try {
          resolve(await collection.updateOne(antigo, { $set: novo }));
        } catch (error) {
          reject(error);
        }
      });
    },
    deleteDocument(doc) {
      return new Promise(async (resolve, reject) => {
        try {
          resolve(await collection.deleteOne(doc))
        } catch (error) {
          console.log(error)
          reject(error);
        }
      });
    },
  };
