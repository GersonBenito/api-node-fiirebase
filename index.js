'use strict'

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const productoRoutes = require('./src/routes/producto-routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser());

app.use('/api', productoRoutes.routes);

app.listen(config.port, () =>{
    console.log(`corriendo en el puerto ${config.port}`);
})