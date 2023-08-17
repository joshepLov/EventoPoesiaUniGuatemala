'use strict'

const express = require('express')
const api = express.Router();
const userController = require('./user.controller')


api.post('/add', userController.addUser);
api.get('/get/:carne', userController.getUser);
api.get('/report', userController.generateReport);
api.post('/login', userController.loging);

module.exports = api;