const express = require('express');
const router = express.Router();
const tiposDeEventosController = require('../../controllers/tiposdeeventos');

/** Create TiposDeEventos. */
router.post('/', tiposDeEventosController.create);
/** List all TiposDeEventos. */
router.get('/', tiposDeEventosController.listAll);
/** Get TiposDeEventos by ID. */
router.get('/:id', tiposDeEventosController.findById);
/** Update TiposDeEventos by ID. */
router.post('/:id', tiposDeEventosController.update);
/** Delete TiposDeEventos by ID. */
router.delete('/:id', tiposDeEventosController.delete);

module.exports = router;
