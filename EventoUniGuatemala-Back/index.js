'use strict'

require('dotenv').config()
const mongoConfig = require('./configs/mongo');
const app = require('./configs/app');
const { createDefaultUser } = require('./src/User/user.controller');


mongoConfig.connect();
app.initServer();

createDefaultUser();