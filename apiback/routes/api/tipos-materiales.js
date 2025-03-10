const express = require('express');
const router = express.Router();
const tiposMaterialController = require('../../controllers/tipo-material');

/** Create TipoMaterial. */
router.post('/', tiposMaterialController.createValidation, tiposMaterialController.create);
/** List all TipoMaterial. */
router.get('/', tiposMaterialController.listAll);
/** Get TipoMaterial by ID. */
router.get('/:id', tiposMaterialController.findById);
/** Update TipoMaterial by ID. */
router.post('/:id', tiposMaterialController.updateValidation, tiposMaterialController.update);
/** Delete TipoMaterial by ID. */
router.delete('/:id', tiposMaterialController.delete);

module.exports = router;
