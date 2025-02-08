const express = require('express');
const router = express.Router();
const personaController = require('../../controllers/persona');

/** Create Persona. */
router.post('/', personaController.create);
/** List all Personas. */
router.get('/', personaController.listAll);
/** Get Persona by ID. */
router.get('/:id', personaController.findById);
/** Update Persona by ID. */
router.post('/:id', personaController.update);
/** Delete Persona by ID. */
router.delete('/:id', personaController.delete);

module.exports = router;
