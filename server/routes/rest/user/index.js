const aa = require('express-async-await');
const wrap = require('express-async-wrap');

const express = require('express');

const router = aa(express.Router());

const {
    register,
    session,
    getUserId,
    login,
    logout,
} = require('./user.js');

router.post('/register', wrap(register));
router.post('/session', wrap(session));
router.post('/session/id', wrap(getUserId));
router.post('/login', wrap(login));
router.post('/logout', wrap(logout));

module.exports = router;
  