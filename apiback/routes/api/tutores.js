const express = require('express');
const router = express.Router();
const tutorController = require('../../controllers/tutor');

/** Create Tutor. */
router.post('/', tutorController.createValidation, tutorController.create);
/** List all Tutor. */
router.get('/', tutorController.listAll);
/** Get Tutor by ID. */
router.get('/:id', tutorController.findById);
/** Update Tutor by ID. */
router.post('/:id', tutorController.updateValidation, tutorController.update);
/** Delete Tutor by ID. */
router.delete('/:id', tutorController.delete);

module.exports = router;
