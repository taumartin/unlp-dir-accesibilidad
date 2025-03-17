const express = require('express');
const router = express.Router();
const materialesAccesibilizados = require('../../controllers/material-accesibilizado');

/** Create Material Accesibilizado. */
router.post('/', materialesAccesibilizados.createValidation, materialesAccesibilizados.create);
/** List all Material Accesibilizado. */
router.get('/', materialesAccesibilizados.listAll);
/** Get Material Accesibilizado by ID. */
router.get('/:id', materialesAccesibilizados.findById);
/** Update Material Accesibilizado by ID. */
router.post('/:id', materialesAccesibilizados.updateValidation, materialesAccesibilizados.update);
/** Delete Material Accesibilizado by ID. */
router.delete('/:id', materialesAccesibilizados.delete);

module.exports = router;
