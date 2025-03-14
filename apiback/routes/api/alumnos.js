const express = require('express');
const router = express.Router();
const alumnoController = require('../../controllers/alumno');

/** Create Alumno. */
router.post('/', alumnoController.createValidation, alumnoController.create);
/** List all Alumno. */
router.get('/', alumnoController.listAll);
/** Get Alumno by ID. */
router.get('/:id', alumnoController.findById);
/** Update Alumno by ID. */
router.post('/:id', alumnoController.updateValidation, alumnoController.update);
/** Delete Alumno by ID. */
router.delete('/:id', alumnoController.delete);

module.exports = router;
