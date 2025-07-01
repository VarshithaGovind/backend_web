const express = require('express');
const router = express.Router();

const miniController = require('../controller/miniController');

// GET all mini projects
router.get('/mini-projects', miniController.getAll);

// GET a single mini project by ID
router.get('/mini-projects/:id', miniController.get);

// CREATE a new mini project
router.post('/mini-projects', miniController.create);

// DELETE a mini project by ID
router.delete('/mini-projects/:id', miniController.delete);

module.exports = router;
