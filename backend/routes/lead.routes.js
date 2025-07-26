const express = require('express');
const router = express.Router();
const leadController = require('../controllers/lead.controller');
const validate = require('../middlewares/validate');
const { leadSchema } = require('../validators/lead.schema');

router.post('/', validate(leadSchema), leadController.createLead);
router.get('/', leadController.getLeads);
router.get('/:id', leadController.getLeadById);
router.put('/:id', leadController.updateLead);
router.delete('/:id', leadController.deleteLead);

module.exports = router;
