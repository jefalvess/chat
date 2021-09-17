const express = require('express');

//Create a new server
const app = express();
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }))
require('./server/server')(app);
