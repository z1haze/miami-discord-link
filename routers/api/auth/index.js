const express = require('express');
const router = express.Router();

const {isAuthenticated} = require('../../../middleware/auth');

router.get('/session', isAuthenticated, require('./session'));
router.use('/callback', require('./callback'));
router.get('/login', require('./login'));
router.get('/logout', require('./logout'));

module.exports = router;
