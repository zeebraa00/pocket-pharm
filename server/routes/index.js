var express = require('express');
var router = express.Router();

router.use('/product', require('./rest/product'));
router.use('/user', require('./rest/user'));
router.use('/history', require('./rest/history'));

module.exports = router;
