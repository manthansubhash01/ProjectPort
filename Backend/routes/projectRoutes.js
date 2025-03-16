const express = require("express");
const router = express.Router();
const project = require('../models/projectModel')

// Get all Projects (GET request)
router.route("/").get( async (req, res) => {
  res.json({ meassge: "Get all projects" });
});



// Create a Project (POST request)
router.route("/").post( async (req, res) => {
  console.log(req.body);
  const {name,urn,projectName,githubRepo} = req.body;
  if (!name || !urn || !projectName || !githubRepo){
    throw new Error('All fields are mandatory');
  }
  res.json({ meassge: "Create a project" , data : req.body});
});



// Update a Project (PUT request)
router.route("/:urn").put( async (req, res) => {
  console.log(req.body);
  const {urn,websiteLink} = req.body;
  if (!urn || !websiteLink){
    throw new Error('All fields are mandatory');
  }
  res.json({ meassge: `Update the project for ${req.params.urn}` });
});



// Delete a Project (DELET request)
router.route("/:urn").delete( async (req, res) => {
  console.log(req.body);
  const {urn} = req.body;
  if (!urn){
    throw new Error('Enter your URN number to delete project');
  }
  res.json({ meassge: `Delete the project for ${req.params.urn}` });
});

module.exports = router;


