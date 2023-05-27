const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config')
const cors = require('cors')
const TaskScheme = require('./models/TaskScheme');
const { findById, findByIdAndUpdate, findByIdAndDelete } = require('./models/TaskScheme');
const Server = require('./Server/server');

const myServer = new Server();
myServer.listen();
