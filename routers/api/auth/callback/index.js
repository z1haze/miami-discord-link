const express = require('express');
const {isAuthenticated} = require('../../../../middleware/auth');
const router = express.Router();

router.get('/google', require('./google'));
router.get('/discord', isAuthenticated, require('./discord'));

module.exports = router;
