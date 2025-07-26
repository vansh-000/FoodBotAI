const express = require('express');
const app = express();
const leadsRouter = require('./routes/lead.routes');
const mcpRouter = require('./routes/mcp.routes');
const errorHandler = require('./middlewares/errorHandler.js');
require('dotenv').config();
require('./db/db');

app.use(express.json());
app.use('/leads', leadsRouter);
app.use('/mcp', mcpRouter);
app.use(errorHandler);

module.exports = app;
