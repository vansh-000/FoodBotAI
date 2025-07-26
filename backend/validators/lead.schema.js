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
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]).optional().default("New"),
  notes: z.string().optional().default(""),
});

module.exports = { leadSchema };
