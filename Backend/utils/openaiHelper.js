require("dotenv").config();

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
if (!HF_API_KEY) {
  console.error("Missing API Key. Set HUGGINGFACE_API_KEY in .env file.");
  process.exit(1);
}

const HF_API =
  "https://manthansubhash01-text-similarity-model.hf.space/predict_batch";

// async function checkForDuplicates(newProject, existingProjects) {
//   try {
//     const requests = existingProjects.map((project) =>
//       fetch(HF_API, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${HF_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           inputs: {
//             source_sentence: newProject,
//             sentence: project,
//           },
//         }),
//       }).then(async (res) => {
//         if (!res.ok) {
//           const errorText = await res.text();
//           throw new Error(`API returned ${res.status}: ${errorText}`);
//         }
//         return res.json();
//       })
//     );

//     const similarityScores = await Promise.all(requests);

//     console.log("Similarity scores:", similarityScores);

//     const threshold = 0.65;
//     const isDuplicate = Math.max(similarityScores) > threshold;

//     return {
//       DUPLICATE: isDuplicate,
//       suggestions: isDuplicate
//         ? "This project idea already exists. Please choose a different one."
//         : "This project idea is unique. You can proceed!",
//       scores: similarityScores,
//     };
//   } catch (error) {
//     console.error("Error calling API:", error.message);
//     throw new Error(
//       "Failed to check for duplicate projects. Please try again later."
//     );
//   }
// }

// module.exports = { checkForDuplicates };

const HF_API_URL = "https://<your-hf-space-name>.hf.space/predict_batch";

async function checkForDuplicates(newIdea, existingIdeas) {
  const payload = {
    newIdea,
    existingIdeas,
  };

  const response = await axios.post(HF_API_URL, payload);

  const { max_score, scores } = response.data;

  return {
    DUPLICATE: max_score >= 0.65,   
  };
}

module.exports = { checkForDuplicates };