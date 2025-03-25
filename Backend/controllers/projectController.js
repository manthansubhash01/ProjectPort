const Project = require("ProjectPort/Backend/models/projectModel.js")
// const { checkForDuplicates } = require("../utils/openaiHelper")

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 })
    res.json(projects)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

// @desc    Register a new project idea
// @route   POST /api/projects/register
// @access  Public
const registerProject = async (req, res) => {
  try {
    const { projectName, projectDescription, studentName, urn, collegeEmail } = req.body

    // Validate input
    if (!projectName || !projectDescription || !studentName || !urn || !collegeEmail) {
      return res.status(400).json({ message: "Please provide all required fields" })
    }

    // Check if URN or email already exists
    const existingProject = await Project.findOne({
      $or: [{ urn }, { collegeEmail }],
    })

    if (existingProject) {
      return res.status(400).json({
        message: "A project with this URN number or college email already exists",
      })
    }

    // Check for duplicate project ideas
    // const existingProjects = await Project.find({})
    // const { isDuplicate, suggestions } = await checkForDuplicates(projectDescription, existingProjects)

    // if (isDuplicate) {
    //   return res.status(409).json({
    //     message: "Project idea is too similar to an existing project",
    //     isDuplicate: true,
    //     suggestions,
    //   })
    // }

    // Create project
    const project = await Project.create({
      projectName,
      projectDescription,
      studentName,
      urn,
      collegeEmail,
      status: "registered",
    })

    res.status(201).json(project)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

// @desc    Submit a completed project
// @route   POST /api/projects/submit
// @access  Public
const submitProject = async (req, res) => {
  try {
    const { urn, collegeEmail, githubLink, hostingLink } = req.body

    // Validate input
    if (!urn || !collegeEmail || !githubLink || !hostingLink) {
      return res.status(400).json({ message: "Please provide all required fields" })
    }

    // Find the project by URN and email
    const project = await Project.findOne({ urn, collegeEmail })

    if (!project) {
      return res.status(404).json({ message: "No registered project found with this URN and email" })
    }

    if (project.status === "submitted") {
      return res.status(400).json({ message: "This project has already been submitted" })
    }

    // Update project with submission details
    project.githubLink = githubLink
    project.hostingLink = hostingLink
    project.status = "submitted"
    project.submissionDate = new Date()

    await project.save()

    res.json({ message: "Project submitted successfully", project })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    res.json(project)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

module.exports = {
  getProjects,
  registerProject,
  submitProject,
  getProjectById,
}

