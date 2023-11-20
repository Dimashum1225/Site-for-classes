const { MongoClient, ServerApiVersion } = require('mongodb');

async function connectToMongoDB() {
  try {
    const uri = "mongodb+srv://sumatbaev7:96185385@cluster0.iorfuh2.mongodb.net/mysite";
    const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return uri;
  } catch(err) {
    console.error(err);
  }
}

module.exports = connectToMongoDB;
