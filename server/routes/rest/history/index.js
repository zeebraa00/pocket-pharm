const aa = require('express-async-await');
const express = require('express');
const router = aa(express.Router());

const { createHist, deleteHistory, listGoodHist , listBadHist} = require('./history.js');

router.post('/create', createHist);
router.delete('/:id', deleteHistory);
router.get('/good', listGoodHist);
router.get('/bad', listBadHist);

module.exports = router;
