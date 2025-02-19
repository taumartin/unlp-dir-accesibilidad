const express = require('express');
const router = express.Router();
const mediosDeComunicacionController = require('../../controllers/medio-comunicacion');

/** Create MediosDeComunicacion. */
router.post('/', mediosDeComunicacionController.create);
/** List all MediosDeComunicacion. */
router.get('/', mediosDeComunicacionController.listAll);
/** Get MediosDeComunicacion by ID. */
router.get('/:id', mediosDeComunicacionController.findById);
/** Update MediosDeComunicacion by ID. */
router.post('/:id', mediosDeComunicacionController.update);
/** Delete MediosDeComunicacion by ID. */
router.delete('/:id', mediosDeComunicacionController.delete);

module.exports = router;
