const express = require("express")
const router = express.Router()
const { getProjects, createProject } = require("../controllers/projectController")

// @route   GET /api/projects
// @desc    Get all projects
router.get("/", getProjects)

// @route   POST /api/projects
// @desc    Create a new project
router.post("/", createProject)

module.exports = router

