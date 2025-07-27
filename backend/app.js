const express = require('express');
const cors = require('cors');
const app = express();

const leadsRouter = require('./routes/lead.routes');
const mcpRouter = require('./routes/mcp.routes');
const aiAgentRoutes = require("./routes/aiAgent.routes");
const errorHandler = require('./middlewares/errorHandler.js');
require('dotenv').config();
require('./db/db');
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use("/api/ai-agent", aiAgentRoutes);
app.use('/leads', leadsRouter);
app.use('/mcp', mcpRouter);
app.use(errorHandler);

module.exports = app;
