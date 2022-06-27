var express = require('express');
const { path } = require('../app');
var router = express.Router();

/* GET post listing. */
// Query params: id
router.get('/', async function(req, res, next) {
    res.sendFile("../client/src/index.js");
});

module.exports = router;