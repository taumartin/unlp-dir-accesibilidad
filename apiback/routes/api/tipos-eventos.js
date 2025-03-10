const express = require('express');
const router = express.Router();
const tipoEventoController = require('../../controllers/tipo-evento');

/** Create TipoEvento. */
router.post('/', tipoEventoController.createValidation, tipoEventoController.create);
/** List all TipoEvento. */
router.get('/', tipoEventoController.listAll);
/** Get TipoEvento by ID. */
router.get('/:id', tipoEventoController.findById);
/** Update TipoEvento by ID. */
router.post('/:id', tipoEventoController.updateValidation, tipoEventoController.update);
/** Delete TipoEvento by ID. */
router.delete('/:id', tipoEventoController.delete);

module.exports = router;
