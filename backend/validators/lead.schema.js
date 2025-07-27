const { z } = require("zod");

const contactSchema = z.object({
  email: z.string().email(),
  phone: z.string().optional(),
});

const leadSchema = z.object({
  name: z.string(),
  source: z.string(),
  contact: contactSchema,
  interestedProducts: z.array(z.string()).optional().default([]),
  stats: z.enum([
    "New",
    "Contacted",
    "Qualified",
    "Proposal",
    "Negotiation",
    "Closed Won",
    "Closed Lost"
  ]).optional().default("New"),
  notes: z.string().optional().default(""),
});

module.exports = { leadSchema };
