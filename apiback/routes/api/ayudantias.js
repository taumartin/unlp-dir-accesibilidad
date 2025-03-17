const express = require('express');
const router = express.Router();
const ayudantiaController = require('../../controllers/ayudantia');

/** Create Ayudantia. */
router.post('/', ayudantiaController.createValidation, ayudantiaController.create);
/** List all Ayudantia. */
router.get('/', ayudantiaController.listAll);
/** Get Ayudantia by ID. */
router.get('/:id', ayudantiaController.findById);
/** Update Ayudantia by ID. */
router.post('/:id', ayudantiaController.updateValidation, ayudantiaController.update);
/** Delete Ayudantia by ID. */
router.delete('/:id', ayudantiaController.delete);

module.exports = router;
