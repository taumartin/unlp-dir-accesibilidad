const express = require('express');
const NotFoundException = require("../exceptions/not-found-exception");
const router = express.Router();

const personasRouter = require('./api/personas');
router.use('/personas', personasRouter);

const mediosDeComunicacionRouter = require('./api/medios-comunicacion');
router.use('/medios-comunicacion', mediosDeComunicacionRouter);

const semestresRouter = require('./api/semestres');
router.use('/semestres', semestresRouter);

const tiposDeMaterialesRouter = require('./api/tipos-materiales');
router.use('/tipos-materiales', tiposDeMaterialesRouter);

const tiposDeEventosRouter = require('./api/tipos-eventos');
router.use('/tipos-eventos', tiposDeEventosRouter);

const materiasRouter = require('./api/materias');
router.use('/materias', materiasRouter);

const eventosRouter = require('./api/eventos');
router.use('/eventos', eventosRouter);

const usuariosRouter = require('./api/usuarios');
router.use('/usuarios', usuariosRouter);

const authRouter = require('./api/auth');
router.use('/auth', authRouter);

// Catch-all other API routes.
router.use('*', (/*req, res*/) => {
    throw new NotFoundException('API route no encontrada.');
});

module.exports = router;
