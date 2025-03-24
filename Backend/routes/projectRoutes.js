const express = require("express")
const router = express.Router()
const { getProjects, registerProject, submitProject, getProjectById } = require("../controllers/projectController")

// @route   GET /api/projects
// @desc    Get all projects
router.get("/", getProjects)

// @route   POST /api/projects/register
// @desc    Register a new project idea
router.post("/register", registerProject)

// @route   POST /api/projects/submit
// @desc    Submit a completed project
router.post("/submit", submitProject)

// @route   GET /api/projects/:id
// @desc    Get project by ID
router.get("/:id", getProjectById)

module.exports = router
