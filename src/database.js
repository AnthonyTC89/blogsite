/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

const USERNAME = process.env.USERNAME_MONGODB;
const PASSWORD = process.env.PASSWORD_MONGODB;

const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@portfolio-atc-n69h1.mongodb.net/blogsite?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};
mongoose.connect(uri, options)
  .then(() => {
    console.log('Successful connection MongoDB Atlas');
  })
  .catch((err) => {
    console.log('Unsuccessful connection MongoDB Atlas', err);
  });

module.exports = mongoose;
