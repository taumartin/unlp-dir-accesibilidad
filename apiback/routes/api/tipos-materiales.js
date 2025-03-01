const express = require('express');
const router = express.Router();
const tiposDeMaterialesController = require('../../controllers/tipo-material');

/** Create TiposDeMateriales. */
router.post('/', tiposDeMaterialesController.createValidation, tiposDeMaterialesController.create);
/** List all TiposDeMateriales. */
router.get('/', tiposDeMaterialesController.listAll);
/** Get TiposDeMateriales by ID. */
router.get('/:id', tiposDeMaterialesController.findById);
/** Update TiposDeMateriales by ID. */
router.post('/:id', tiposDeMaterialesController.updateValidation, tiposDeMaterialesController.update);
/** Delete TiposDeMateriales by ID. */
router.delete('/:id', tiposDeMaterialesController.delete);

module.exports = router;
