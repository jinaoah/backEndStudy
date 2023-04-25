const express = require('express');
const passport = require('passport');

const { join, login, logout } = require('../controllers/auth');
const { isLoggedIn ,isNotLoggedIn } = require('../middlewares');

const router = express.Router();

//POST /auth/join
router.post('/join', isNotLoggedIn, join);
//POST /auth/login
router.post('/login', isNotLoggedIn, login);
router.post('/', (req, res) => {
    console.log(req.body);
})
//GET /auth/logout
router.get('/logout', isLoggedIn, logout);

module.exports = router;