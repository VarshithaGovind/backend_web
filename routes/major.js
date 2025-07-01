const express = require('express');
const router = express.Router();
const Major = require('../models/majorProject');

// Get all major projects (first 3 free if not a club member)
router.get('/major-projects', async (req, res) => {
    try {
        const projects = await Major.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Add a major project
router.post('/major-projects', async (req, res) => {
    try {
        const { title, description, isFree } = req.body;
        const newProject = new Major({ title, description, isFree });
        await newProject.save();
        res.json({ message: 'Major project added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add major project' });
    }
});

module.exports = router;
