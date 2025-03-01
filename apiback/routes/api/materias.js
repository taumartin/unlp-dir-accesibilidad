const express = require('express');
const router = express.Router();
const MateriaController = require('../../controllers/materia');

/** Create Materia. */
router.post('/', MateriaController.createValidation, MateriaController.create);
/** List all Materia. */
router.get('/', MateriaController.listAll);
/** Get Materia by ID. */
router.get('/:id', MateriaController.findById);
/** Update Materia by ID. */
router.post('/:id', MateriaController.updateValidation, MateriaController.update);
/** Delete Materia by ID. */
router.delete('/:id', MateriaController.delete);

module.exports = router;
