const express = require('express');
const router = express.Router();
const eventoController = require('../../controllers/evento');

/** Create Evento. */
router.post('/', eventoController.create);
/** List all Eventos. */
router.get('/', eventoController.listAll);
/** Get Evento by ID. */
router.get('/:id', eventoController.findById);
/** Update Evento by ID. */
router.post('/:id', eventoController.update);
/** Delete Evento by ID. */
router.delete('/:id', eventoController.delete);

module.exports = router;
