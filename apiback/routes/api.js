const express = require('express');
const NotFoundException = require("../exceptions/not-found-exception");
const router = express.Router();

const personasRouter = require('./api/personas');
router.use('/personas', personasRouter);

const alumnosRouter = require('./api/alumnos');
router.use('/alumnos', alumnosRouter);

const tutoresRouter = require('./api/tutores');
router.use('/tutores', tutoresRouter);

const reunionesRouter = require('./api/reuniones');
router.use('/reuniones', reunionesRouter);

const apoyosRouter = require('./api/apoyos');
router.use('/apoyos', apoyosRouter);

const ayudantiasRouter = require('./api/ayudantias');
router.use('/ayudantias', ayudantiasRouter);

const mediosComunicacionRouter = require('./api/medios-comunicacion');
router.use('/medios-comunicacion', mediosComunicacionRouter);

const semestresRouter = require('./api/semestres');
router.use('/semestres', semestresRouter);

const tiposMaterialesRouter = require('./api/tipos-materiales');
router.use('/tipos-materiales', tiposMaterialesRouter);

const materialesAccesibilizadosRouter = require('./api/materiales-accesibilizados');
router.use('/materiales-accesibilizados', materialesAccesibilizadosRouter);

const tutoresTrabajosEnMaterialesRouter = require('./api/tutores-trabajos-en-materiales');
router.use('/tutores-trabajos-en-materiales', tutoresTrabajosEnMaterialesRouter);

const tiposEventosRouter = require('./api/tipos-eventos');
router.use('/tipos-eventos', tiposEventosRouter);

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
