const mongoose = require("mongoose");

let connectionPromise;

async function connectToMongo() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not configured.");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URL, {
        bufferCommands: false,
      })
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  await connectionPromise;
  return mongoose.connection;
}

module.exports = {
  connectToMongo,
};
