const axios = require("axios");
const { z } = require("zod");
require("dotenv").config();

const conversationSchema = z.object({
  conversation: z.string(),
});

const MCP_ENDPOINT = process.env.MCP_ENDPOINT || "http://localhost:3001/mcp/execute";

const buildPrompt = (conversation) => `You're an AI CRM agent. Extract structured data from the conversation below and return a JSON payload for the createLead command. The source is \"cold_call\".
Conversation:
${conversation}`;

const aiAgentController = async (req, res, next) => {
  try {
    const { conversation } = conversationSchema.parse(req.body);

    const prompt = buildPrompt(conversation);

    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI CRM agent.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const extractedJson = JSON.parse(openaiResponse.data.choices[0].message.content);

    const mcpRes = await axios.post(MCP_ENDPOINT, extractedJson);

    res.status(200).json({ success: true, result: mcpRes.data.result });
  } catch (error) {
    next(error);
  }
};

module.exports = { aiAgentController };