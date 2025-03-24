const { OpenAI } = require("openai");
require("dotenv").config(); // Load environment variables

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const checkForDuplicates = async (description, existingProjects) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OpenAI API Key");
    }

    if (existingProjects.length === 0) {
      return { isDuplicate: false, suggestions: [] };
    }

    const existingDescriptions = existingProjects.map((project) => project.description);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that checks if a project description is too similar to existing projects. 
          If it's too similar (more than 70% similar in concept, not just wording), respond with "DUPLICATE: true". 
          Otherwise, respond with "DUPLICATE: false". 
          If it's a duplicate, also suggest 3 alternative project ideas that are related but different enough to be unique. 
          Format these as "SUGGESTIONS: 1. First suggestion, 2. Second suggestion, 3. Third suggestion"`,
        },
        {
          role: "user",
          content: `New project description: "${description}"\n\nExisting project descriptions:\n${existingDescriptions
            .map((desc, i) => `${i + 1}. "${desc}"`)
            .join("\n")}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = response?.choices?.[0]?.message?.content || "";

    if (!aiResponse) {
      console.error("Unexpected API response:", response);
      return { isDuplicate: false, suggestions: [] };
    }

    const isDuplicate = aiResponse.includes("DUPLICATE: true");

    let suggestions = [];
    if (isDuplicate) {
      const match = aiResponse.match(/SUGGESTIONS:(.*)/s);
      if (match && match[1]) {
        suggestions = match[1]
          .split(/\d+\.\s*/)
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    return { isDuplicate, suggestions };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return { isDuplicate: false, suggestions: [] };
  }
};

module.exports = { checkForDuplicates };
