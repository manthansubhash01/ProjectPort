const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    githubLink: {
      type: String,
      required: true,
      trim: true,
    },
    hostingLink: {
      type: String,
      required: true,
      trim: true,
    },
    submittedBy: {
      teamName: { type: String, required: true, trim: true },
      members: [
        {
          name: { type: String, required: true, trim: true },
          studentId: { type: String, required: true, trim: true },
        },
      ],
    },
    claimedBy: {
      teamName: { type: String, trim: true },
      members: [
        {
          name: { type: String, trim: true },
          studentId: { type: String, trim: true },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
