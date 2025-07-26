const leadController = require('../controllers/lead.controller');

const commandMap = {
  createLead: leadController.createLeadFromMCP,
  getLeads: leadController.getAllLeadsFromMCP,
  getLeadById: leadController.getLeadByIdFromMCP,
  updateLead: leadController.updateLeadFromMCP,
  deleteLead: leadController.deleteLeadFromMCP
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