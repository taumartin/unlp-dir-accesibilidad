const express = require('express');
const router = express.Router();
const reunionController = require('../../controllers/reunion');

/** Create Reunion. */
router.post('/', reunionController.createValidation, reunionController.create);
/** List all Reunion. */
router.get('/', reunionController.listAll);
/** Get Reunion by ID. */
router.get('/:id', reunionController.findById);
/** Update Reunion by ID. */
router.post('/:id', reunionController.updateValidation, reunionController.update);
/** Delete Reunion by ID. */
router.delete('/:id', reunionController.delete);

module.exports = router;
