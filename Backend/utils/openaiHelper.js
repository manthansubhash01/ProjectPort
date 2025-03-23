const { Configuration, OpenAIApi } = require("openai")

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const checkForDuplicates = async (description, existingProjects) => {
  try {
    // If there are no existing projects, it can't be a duplicate
    if (existingProjects.length === 0) {
      return { isDuplicate: false, suggestions: [] }
    }

    // Extract descriptions from existing projects
    const existingDescriptions = existingProjects.map((project) => project.description)

    // Use OpenAI to check for similarity and generate suggestions
    const response = await openai.createChatCompletion({
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
          content: `New project description: "${description}"\n\nExisting project descriptions: ${existingDescriptions.map((desc, i) => `${i + 1}. "${desc}"`).join("\n")}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const aiResponse = response.data.choices[0].message.content || ""

    // Parse the response
    const isDuplicate = aiResponse.includes("DUPLICATE: true")

    let suggestions = []
    if (isDuplicate) {
      const suggestionsMatch = aiResponse.match(/SUGGESTIONS:(.*)/s)
      if (suggestionsMatch && suggestionsMatch[1]) {
        suggestions = suggestionsMatch[1]
          .split(/\d+\./)
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
      }
    }

    return { isDuplicate, suggestions }
  } catch (error) {
    console.error("OpenAI API error:", error)
    // If there's an error with the OpenAI API, default to allowing the submission
    return { isDuplicate: false, suggestions: [] }
  }
}

module.exports = { checkForDuplicates }

