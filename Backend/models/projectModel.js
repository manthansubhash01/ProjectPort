const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  studentName: { type: String, require: true },
  urn: { type: String, require: true },
  collegeEmail: { type: String, require: true },
  projectName: { type: String, require: true },
  projectDescription: { type: String, require: true },
  githubLink: { type: String, require: true },
  hostingLink: { type: String, default: null },
  submissionDate: { type: Date, default: null },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project