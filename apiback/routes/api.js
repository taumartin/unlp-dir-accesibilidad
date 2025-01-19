const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.json({test: true, result: "OK"});
});

module.exports = router;
