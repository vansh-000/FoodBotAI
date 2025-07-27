const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead
} = require('./lead.controller'); 

exports.createLeadFromMCP = async (data) => {
  return new Promise((resolve, reject) => {
    const req = { body: data };
    const res = {
      json: (data) => resolve(data),
      status: (code) => ({
        json: (data) => reject({ status: code, ...data }),
      }),
    };
    createLead(req, res, (err) => reject(err));
  });
};

exports.getAllLeadsFromMCP = async () => {
  return new Promise((resolve, reject) => {
    getAllLeads({}, {
      json: (data) => resolve(data),
      status: (code) => ({ json: (data) => reject({ status: code, ...data }) })
    }, (err) => reject(err));
  });
};

exports.getLeadByIdFromMCP = async (data) => {
  return new Promise((resolve, reject) => {
    getLeadById({ params: { id: data.id } }, {
      json: (data) => resolve(data),
      status: (code) => ({ json: (data) => reject({ status: code, ...data }) })
    }, (err) => reject(err));
  });
};

exports.updateLeadFromMCP = async (data) => {
  return new Promise((resolve, reject) => {
    updateLead({ params: { id: data.id }, body: data.update }, {
      json: (data) => resolve(data),
      status: (code) => ({ json: (data) => reject({ status: code, ...data }) })
    }, (err) => reject(err));
  });
};

exports.deleteLeadFromMCP = async (data) => {
  return new Promise((resolve, reject) => {
    deleteLead({ params: { id: data.id } }, {
      json: (data) => resolve(data),
      status: (code) => ({ json: (data) => reject({ status: code, ...data }) })
    }, (err) => reject(err));
  });
};
