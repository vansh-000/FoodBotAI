const db = require('../db/db');

const leadsCollection = db.collection("leads");

module.exports = leadsCollection;
