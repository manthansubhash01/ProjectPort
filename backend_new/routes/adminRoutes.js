const express = require("express")
const router = express.Router()
const { loginAdmin, updateProject, deleteProject } = require("../controllers/adminController")
const { protect } = require("../middleware/authMiddleware")

// @route   POST /api/admin/login
// @desc    Auth admin & get token
router.post("/login", loginAdmin)

// @route   PUT /api/admin/projects/:id
// @desc    Update a project
router.put("/projects/:id", protect, updateProject)

// @route   DELETE /api/admin/projects/:id
// @desc    Delete a project
router.delete("/projects/:id", protect, deleteProject)

module.exports = router