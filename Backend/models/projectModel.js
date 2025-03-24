const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  name: { type: String, require: true },
  urn: { type: String, require: true },
  email: { type: String, require: true },
  projectName: { type: String, require: true },
  projectDescription: { type: String, require: true },
  githubRepo: { type: String, require: true },
  websiteLink: { type: String, default: null },
  submittedAt: { type: Date, default: null },
});

module.exports = mongoose.model("Project", projectSchema);
