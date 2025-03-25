const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Project = require("../models/project");
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

// @desc    Update a project
// @route   PUT /api/admin/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const {
      title,
      description,
      studentName,
      urnNumber,
      collegeEmail,
      technologies,
      status,
      githubLink,
      hostingLink,
    } = req.body;

    // Find project by id
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update project fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (studentName) project.studentName = studentName;
    if (urnNumber) project.urnNumber = urnNumber;
    if (collegeEmail) project.collegeEmail = collegeEmail;
    if (technologies) project.technologies = technologies;
    if (status) project.status = status;
    if (githubLink) project.githubLink = githubLink;
    if (hostingLink) project.hostingLink = hostingLink;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a project
// @route   DELETE /api/admin/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.deleteOne();
    res.json({ message: "Project removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

module.exports = {
  loginAdmin,
  updateProject,
  deleteProject,
};
