const leadsCollection = require('../models/lead.model');
const { FieldValue } = require("firebase-admin/firestore");

const { leadSchema } = require('../validators/lead.schema');

exports.createLead = async (req, res, next) => {
  try {
    const parsedData = leadSchema.parse(req.body);
    const docRef = await db.collection('leads').add(parsedData);
    const newLead = await docRef.get();
    res.status(201).json({ id: docRef.id, ...newLead.data() });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    next(error);
  }
};


exports.getAllLeads = async (req, res, next) => {
  try {
    const snapshot = await leadsCollection.get();
    const leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(leads);
  } catch (err) {
    next(err);
  }
};

exports.getLeadById = async (req, res, next) => {
  try {
    const doc = await leadsCollection.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Lead not found" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    next(err);
  }
};

exports.updateLead = async (req, res, next) => {
  try {
    await leadsCollection.doc(req.params.id).update(req.body);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteLead = async (req, res, next) => {
  try {
    await leadsCollection.doc(req.params.id).delete();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
