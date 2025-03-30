const express = require("express")
const router = express.Router()
const { loginAdmin, updateProject, deleteProject } = require("../controllers/adminController")
const { protect } = require("../middleware/authMiddleware")

//POST /api/admin/login
//Auth admin & get token
router.post("/login", loginAdmin)

//PUT /api/admin/projects/:id
// Update a project
router.put("/projects/:id", protect, updateProject)

//DELETE /api/admin/projects/:id
//Delete a project
router.delete("/projects/:id", protect, deleteProject)

module.exports = router
