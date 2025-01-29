const express = require('express');
const router = express.Router();

// FIXME: quitar
router.get('/', function (req, res, next) {
    res.json({test: true, result: "OK"});
});

const personasRouter = require('./api/personas');
router.use('/personas', personasRouter);

module.exports = router;
