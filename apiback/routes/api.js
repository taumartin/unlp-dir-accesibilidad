const express = require('express');
const router = express.Router();

const personasRouter = require('./api/personas');
router.use('/personas', personasRouter);

const mediosDeComunicacionRouter = require('./api/mediosdecomunicacion');
router.use('/mediosdecomunicacion', mediosDeComunicacionRouter);

const semestresRouter = require('./api/semestres');
router.use('/semestres', semestresRouter);

const tiposDeMaterialesRouter = require('./api/tiposdemateriales');
router.use('/tiposdemateriales', tiposDeMaterialesRouter);

const tiposDeEventosRouter = require('./api/tiposdeeventos');
router.use('/tiposdeeventos', tiposDeEventosRouter);

const materiasRouter = require('./api/materias');
router.use('/materias', materiasRouter);

const eventosRouter = require('./api/eventos');
router.use('/eventos', eventosRouter);

const usuariosRouter = require('./api/usuarios');
router.use('/usuarios', usuariosRouter);

module.exports = router;
