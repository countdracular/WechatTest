/**
 * Created by Administrator on 2015/9/5.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('wxjssdktest');
});

module.exports = router;
