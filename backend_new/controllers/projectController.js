const Project = require("../models/Project");
const { checkForDuplicates } = require("../utils/openaiHelper");

// @desc    Get all projects (both available and claimed)
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Claim a project topic as a team
// @route   PUT /api/projects/:id/claim
// @access  Public
const claimProject = async (req, res) => {
  try {
    const { teamName, members } = req.body; // members = [{ name, studentId }, { name, studentId }, ...]

    // Validate input
    if (!teamName || !members || members.length === 0) {
      return res.status(400).json({ message: "Team name and members are required" });
    }

    // Find the project by ID
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if the project is already claimed
    if (project.claimedBy) {
      return res.status(400).json({ message: "This project has already been claimed by another team" });
    }

    // Claim the project
    project.claimedBy = { teamName, members }; // Store team details
    await project.save();

    res.json({ message: "Project claimed successfully", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a new project (submitted by a team)
// @route   POST /api/projects
// @access  Public
const createProject = async (req, res) => {
  try {
    const { title, description, author, technologies, teamName, members } = req.body;

    // Validate input
    if (!title || !description || !author || !technologies || !teamName || !members || members.length === 0) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Check for duplicate projects
    const existingProjects = await Project.find({});
    const { isDuplicate, suggestions } = await checkForDuplicates(description, existingProjects);

    if (isDuplicate) {
      return res.status(409).json({
        message: "Project description is too similar to an existing project",
        isDuplicate: true,
        suggestions,
      });
    }

    // Create a team-submitted project
    const project = await Project.create({
      title,
      description,
      author,
      technologies,
      submittedBy: { teamName, members }, // Store team info
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getProjects,
  claimProject,
  createProject,
};
