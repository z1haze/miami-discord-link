const express = require('express');
const {isGuest, isAuthenticated} = require('../../../../middleware/auth');
const router = express.Router();

router.get('/google', isGuest, require('./google'));
router.get('/discord', isAuthenticated, require('./discord'));

module.exports = router;
