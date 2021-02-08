// Dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const faker = require("faker");
const dotenv = require("dotenv");

// Config
dotenv.config({ path: "./config/config.env" });

// Models
const user = require("./models/user");

// Modules
const connectDB = require("./config/db");

// Documents to insert
const users = [];

// Password to all users (to be able to log with any fake account)
const userFakePassword = bcrypt.hashSync("secret", 2);

// Create n users

// Get the n from the console
n = process.argv.slice(2)[0];
// push to users array
for (let i = 0; i < n; i++) {
  users.push({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: userFakePassword,
  });
}

// Show some logs
console.log("#################");
console.log("Data seed");
console.log("#################");
console.log("To insert:");
console.log(`${users.length} users`);

// Connect to DB
connectDB();

if (mongoose.connection.readyState) {
  Promise.all([user.insertMany(users)]).then((docs) => {
    mongoose.connection.close();
  });
}
