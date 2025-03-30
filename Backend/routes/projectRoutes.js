const express = require("express")
const router = express.Router()
const { getProjects, registerProject, submitProject, getProjectById } = require("../controllers/projectController")

//GET /api/projects
//Get all projects
router.get("/", getProjects)

//POST /api/projects/register
//Register a new project idea
router.post("/register", registerProject)

//POST /api/projects/submit
//Submit a completed project
router.post("/submit", submitProject)

//GET /api/projects/:id
//Get project by ID
router.get("/:id", getProjectById)

module.exports = router
