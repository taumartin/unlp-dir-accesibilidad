const express = require('express');
const router = express.Router();

/* GET home page redirects to Front (Portal). */
router.get('/', function (req, res, next) {
    res.redirect(301, '/portal');
});

module.exports = router;
