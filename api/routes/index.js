var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
    res.render("../../client/public/index.js", {title: "index"})
})

module.exports = router;