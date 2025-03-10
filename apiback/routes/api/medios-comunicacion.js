const express = require('express');
const router = express.Router();
const medioComunicacionController = require('../../controllers/medio-comunicacion');

/** Create MedioComunicacion. */
router.post('/', medioComunicacionController.createValidation, medioComunicacionController.create);
/** List all MedioComunicacion. */
router.get('/', medioComunicacionController.listAll);
/** Get MedioComunicacion by ID. */
router.get('/:id', medioComunicacionController.findById);
/** Update MedioComunicacion by ID. */
router.post('/:id', medioComunicacionController.updateValidation, medioComunicacionController.update);
/** Delete MedioComunicacion by ID. */
router.delete('/:id', medioComunicacionController.delete);

module.exports = router;
