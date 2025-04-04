const express = require('express');
const router = express.Router();
const semestreController = require('../../controllers/semestre');

/** Create Semestre. */
router.post('/', semestreController.createValidation, semestreController.create);
/** List all Semestre. */
router.get('/', semestreController.listAll);
/** Get Semestre by ID. */
router.get('/:id', semestreController.findById);
/** Update Semestre by ID. */
router.post('/:id', semestreController.updateValidation, semestreController.update);
/** Delete Semestre by ID. */
router.delete('/:id', semestreController.delete);

module.exports = router;
