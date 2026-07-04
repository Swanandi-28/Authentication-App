const { MongoClient } = require("mongodb");

const uri ="mongodb://Swanandi:Swanandi-28@ac-oqcrdn1-shard-00-00.bxlgvbf.mongodb.net:27017,ac-oqcrdn1-shard-00-01.bxlgvbf.mongodb.net:27017,ac-oqcrdn1-shard-00-02.bxlgvbf.mongodb.net:27017/?ssl=true&replicaSet=atlas-v98d5a-shard-0&authSource=admin&appName=Project-1";

async function run() {
  try {
    const client = new MongoClient(uri);

    await client.connect();

    console.log("✅ Connected Successfully!");

    await client.close();
  } catch (err) {
    console.error(err);
  }
}

run();