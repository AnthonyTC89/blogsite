/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

const USERNAME = process.env.USERNAME_MONGODB;
const PASSWORD = process.env.PASSWORD_MONGODB;

const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@portfolio-atc-n69h1.mongodb.net/blogsite?retryWrites=true&w=majority`;

mongoose.set('useCreateIndex', true);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successful connection MongoDB Atlas');
  })
  .catch((err) => {
    console.log('Unsuccessful connection MongoDB Atlas', err);
  });

module.exports = mongoose;
