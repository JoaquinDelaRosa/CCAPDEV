var express = require('express');
const path = require("path")
var router = express.Router();

/* GET post listing. */
// Query params: id
router.get('*', async function(req, res, next) {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});

module.exports = router;