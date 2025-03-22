const express = require("express");
const router = express.Router();
const project = require('../models/projectModel')

// Get all Projects (GET request)
router.route("/").get( async (req, res) => {
  const projects = await project.find()
  res.json(projects);
});



// Create a Project (POST request)
router.route("/").post( async (req, res) => {
  console.log(req.body);
  const {name,urn,projectName,githubRepo} = req.body;
  if (!name || !urn || !projectName || !githubRepo){
    throw new Error('All fields are mandatory');
  }
  const projects = await project.create(req.body)
  res.json(projects);
});



// Update a Project (PUT request)
router.route("/:urn").put( async (req, res) => {
  console.log(req.body);
  const {urn,websiteLink} = req.body;
  if (!urn || !websiteLink){
    throw new Error('All fields are mandatory');
  }
  const projects = await project.updateOne(req.body)
  res.json(projects);
});



// Delete a Project (DELET request)
router.route("/:urn").delete( async (req, res) => {
  console.log(req.body);
  const {urn} = req.body;
  if (!urn){
    throw new Error('Enter your URN number to delete project');
  }
  const projects = await project.deleteOne(req.body)
  res.json(projects);
});

module.exports = router;


