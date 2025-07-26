const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead
} = require('./lead.controller'); 

exports.createLeadFromMCP = async (data) => {
  return await createLead({ body: data });
};

exports.getAllLeadsFromMCP = async () => {
  return await getAllLeads();
};

exports.getLeadByIdFromMCP = async (data) => {
  if (!data?.id) throw new Error('Missing lead ID');
  return await getLeadById({ params: { id: data.id } });
};

exports.updateLeadFromMCP = async (data) => {
  if (!data?.id || !data?.update) throw new Error('Missing ID or update payload');
  return await updateLead({ params: { id: data.id }, body: data.update });
};

exports.deleteLeadFromMCP = async (data) => {
  if (!data?.id) throw new Error('Missing lead ID');
  return await deleteLead({ params: { id: data.id } });
};
