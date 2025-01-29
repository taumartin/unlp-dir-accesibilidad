const express = require('express');
const router = express.Router();
const personaController = require('../../controllers/persona');

/* Create Persona. */
router.post('/', personaController.create);
router.get('/', personaController.listAll);
router.get('/:id', personaController.findById);

module.exports = router;
