const express = require("express");
const router = express.Router();
const { aiAgentController } = require("../controllers/aiAgent.controller");

router.post("/parse-and-create", aiAgentController);

module.exports = router;
