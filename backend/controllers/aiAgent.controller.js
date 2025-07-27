const axios = require("axios");
const { z } = require("zod");
require("dotenv").config();

const { leadSchema } = require("../validators/lead.schema.js");

const conversationSchema = z.object({
  conversation: z.string().min(1, "Conversation cannot be empty"),
});

const MCP_ENDPOINT = process.env.MCP_ENDPOINT || "http://localhost:3001/mcp/execute";

const buildPrompt = (conversation) => `You're an AI CRM agent. Extract structured data from the conversation below and return ONLY a JSON payload for the createLead command. The source should be "cold_call".

Important: 
- Return ONLY valid JSON, no additional text or formatting
- Include all required fields as defined in the lead schema
- Use null for missing optional fields

Conversation:
${conversation}

Return format example:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "source": "cold_call",
  "notes": "Interested in our product"
}`;

const extractJsonFromResponse = (content) => {
  // Try to extract JSON from response that might have extra text
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return jsonMatch[0];
  }
  return content;
};

const aiAgentController = async (req, res, next) => {
  try {
    // Validate request body
    const validationResult = conversationSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: "Invalid request body",
        details: validationResult.error.errors,
      });
    }

    const { conversation } = validationResult.data;

    // Check for required environment variables
    if (!process.env.OPENAI_API_KEY) {
      console.error("Missing OPENAI_API_KEY environment variable");
      return res.status(500).json({
        error: "Server configuration error",
        details: "Missing API key",
      });
    }

    const prompt = buildPrompt(conversation);

    // Call OpenAI API with better error handling
    let openaiResponse;
    try {
      openaiResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { 
              role: "system", 
              content: "You are a helpful AI CRM agent. Always respond with valid JSON only, no additional text or markdown formatting." 
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.1, // Lower temperature for more consistent JSON output
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 30000, // 30 second timeout
        }
      );
    } catch (openaiError) {
      console.error("OpenAI API Error:", openaiError.response?.data || openaiError.message);
      return res.status(500).json({
        error: "Failed to process conversation with AI",
        details: openaiError.response?.data?.error?.message || openaiError.message,
      });
    }

    const aiRawOutput = openaiResponse.data.choices[0]?.message?.content;
    
    if (!aiRawOutput) {
      console.error("Empty response from OpenAI");
      return res.status(500).json({
        error: "Empty response from AI service",
      });
    }

    // Parse and validate AI response
    let parsedData;
    try {
      const cleanedJson = extractJsonFromResponse(aiRawOutput.trim());
      const rawJson = JSON.parse(cleanedJson);
      
      // Validate against lead schema
      const schemaValidation = leadSchema.safeParse(rawJson);
      if (!schemaValidation.success) {
        console.error("Schema validation failed:", schemaValidation.error.errors);
        console.error("Raw AI output:", aiRawOutput);
        return res.status(500).json({
          error: "AI response doesn't match required schema",
          details: schemaValidation.error.errors,
          raw: aiRawOutput,
        });
      }
      
      parsedData = schemaValidation.data;
    } catch (parseError) {
      console.error("JSON parsing failed:", parseError.message);
      console.error("Raw AI output:", aiRawOutput);
      return res.status(500).json({
        error: "Failed to parse AI response as JSON",
        details: parseError.message,
        raw: aiRawOutput,
      });
    }

    // Send to MCP endpoint
    try {
      const mcpResponse = await axios.post(
        MCP_ENDPOINT,
        {
          command: "createLead",
          data: parsedData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 15000, // 15 second timeout
        }
      );

      return res.status(200).json({ 
        success: true, 
        result: mcpResponse.data.result,
        leadData: parsedData,
      });
    } catch (mcpError) {
      console.error("MCP Error:", mcpError.response?.data || mcpError.message);
      return res.status(500).json({
        error: "Failed to create lead in CRM",
        details: mcpError.response?.data || mcpError.message,
        leadData: parsedData, // Include the parsed data for debugging
      });
    }
  } catch (error) {
    console.error("Unexpected error in AI Agent Controller:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

module.exports = { aiAgentController };