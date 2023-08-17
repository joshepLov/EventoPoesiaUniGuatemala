'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
//Puerto
const port = process.env.PORT || 3000


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'))

//Exportar rutas
const userRouter = require('../src/User/user.routes')

//Utilizar las rutas
app.use('/user', userRouter)



exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server listening in port ${port}`);
}

