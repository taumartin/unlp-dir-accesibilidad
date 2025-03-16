const express = require('express');
const router = express.Router();
const apoyoController = require('../../controllers/apoyo');

/** Create Apoyo. */
router.post('/', apoyoController.createValidation, apoyoController.create);
/** List all Apoyo. */
router.get('/', apoyoController.listAll);
/** Get Apoyo by ID. */
router.get('/:id', apoyoController.findById);
/** Update Apoyo by ID. */
router.post('/:id', apoyoController.updateValidation, apoyoController.update);
/** Delete Apoyo by ID. */
router.delete('/:id', apoyoController.delete);

module.exports = router;
