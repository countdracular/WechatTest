/**
 * Created by Administrator on 2015/9/3.
 */
var express = require('express');
var router = express.Router();

/* GET map page lizikuan. */
router.get('/map', function(req, res, next) {
    res.render('map');
});

module.exports = router;

