const { getAllLeadsFromMCP, createLeadFromMCP, getLeadByIdFromMCP, updateLeadFromMCP, deleteLeadFromMCP } = require('../controllers/mcp.controller.js');

const commandMap = {
  createLead: createLeadFromMCP,
  getAllLeads: getAllLeadsFromMCP,
  getLeadById: getLeadByIdFromMCP,
  updateLead: updateLeadFromMCP,
  deleteLead: deleteLeadFromMCP,
}; 


async function processCommand(commandObj) {
  const { command, data } = commandObj;
  const handler = commandMap[command];

  if (!handler) {
    throw new Error(`Unsupported command: ${command}`);
  }

  return await handler(data);
}

module.exports = { processCommand };