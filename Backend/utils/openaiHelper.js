require("dotenv").config();

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
if (!HF_API_KEY) {
  console.error("Missing API Key. Set HUGGINGFACE_API_KEY in .env file.");
  process.exit(1);
}

const HF_API = "https://api-inference.huggingface.co/models/manthansubhash01/sbert-stsb-manual";

async function checkForDuplicates(newProject, existingProjects) {
  try {
    const response = await fetch(HF_API,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            source_sentence: newProject,
            sentences: existingProjects,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const similarityScores = await response.json();
    console.log(similarityScores)
    const threshold = 0.65;
    const isDuplicate = similarityScores.some((score) => score > threshold);

    return {
      DUPLICATE: isDuplicate,
      suggestions: isDuplicate
        ? "This project idea already exists. Please choose a different one."
        : "This project idea is unique. You can proceed!",
    };
  } catch (error) {
    console.error("Error calling API:", error.message);
    return { DUPLICATE: false, suggestions: "Error checking for duplicates." };
  }
}

module.exports = {checkForDuplicates};
