// Dependencies
const mongoose = require("mongoose");

const mongo_uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}.papn8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Connect to DB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongo_uri, {
      // Prevent some warnings in the console
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("DB conection failed with error:");
    console.log(err);
    process.exit(1); // Stop the process
  }
};

module.exports = connectDB;
