const express = require('express');
const app = express();
const leadsRouter = require('./routes/lead.routes');
const errorHandler = require('./middlewares/errorHandler.js');
require('dotenv').config();
require('./db/db');

app.use(express.json());
app.use('/leads', leadsRouter);
app.use(errorHandler);

module.exports = app;
