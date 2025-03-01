const express = require('express');
const router = express.Router();
const usuarioController = require('../../controllers/usuario');

/** Create Usuario. */
router.post('/', usuarioController.createValidation, usuarioController.create);
/** List all Usuarios. */
router.get('/', usuarioController.listAll);
/** Get Usuario by ID. */
router.get('/:id', usuarioController.findById);
/** Update Usuario by ID. */
router.post('/:id', usuarioController.updateValidation, usuarioController.update);
/** Delete Usuario by ID. */
router.delete('/:id', usuarioController.delete);

module.exports = router;
