const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Project = require("../models/Project");

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for admin user
    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a new project topic
// @route   POST /api/admin/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const { title, description, author, technologies } = req.body;

    const newProject = new Project({
      title,
      description,
      author,
      technologies,
      claimed: false, // Make sure new topics are unclaimed
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a project
// @route   PUT /api/admin/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const { title, description, author, technologies } = req.body;

    // Find project by id
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update project fields
    project.title = title || project.title;
    project.description = description || project.description;
    project.author = author || project.author;
    project.technologies = technologies || project.technologies;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a project or topic
// @route   DELETE /api/admin/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.deleteOne();
    res.json({ message: "Project or topic deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Generate JWT token for authentication
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

module.exports = {
  loginAdmin,
  createProject, // ✅ Admin can add new project topics
  updateProject,
  deleteProject, // ✅ Admin can delete both topics & projects
};
