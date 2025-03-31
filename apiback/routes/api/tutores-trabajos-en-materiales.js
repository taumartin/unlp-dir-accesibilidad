const express = require('express');
const router = express.Router();
const tutoresTrabajosEnMateriales = require('../../controllers/tutor-trabajo-en-material');

/** Create TutorTrabajoEnMaterial. */
router.post('/', tutoresTrabajosEnMateriales.createValidation, tutoresTrabajosEnMateriales.create);
/** List all TutorTrabajoEnMaterial. */
router.get('/', tutoresTrabajosEnMateriales.listAll);
/** Get TutorTrabajoEnMaterial by ID. */
router.get('/:id', tutoresTrabajosEnMateriales.findById);
/** Update TutorTrabajoEnMaterial by ID. */
router.post('/:id', tutoresTrabajosEnMateriales.updateValidation, tutoresTrabajosEnMateriales.update);
/** Delete TutorTrabajoEnMaterial by ID. */
router.delete('/:id', tutoresTrabajosEnMateriales.delete);

module.exports = router;
