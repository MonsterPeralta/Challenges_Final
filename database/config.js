const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
  try {
    const dbConnectionString = process.env.DB_CONNECTION;

    mongoose.connect(dbConnectionString, {
      autoIndex: true
    });

    console.log('DB Online');
  } catch (error) {
    console.log(error);
    throw new Error('Error al conectar en DB');
  }
};

module.exports = { dbConnection };