const express = require('express');
const router = express.Router();
const { processCommand } = require('../mcp/commandProcessor');

router.post('/execute', async (req, res, next) => {
  try {
    const result = await processCommand(req.body);
    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;