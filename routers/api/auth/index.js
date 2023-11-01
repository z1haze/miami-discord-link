const express = require('express');
const router = express.Router();

router.use('/callback', require('./callback'));
router.get('/login', require('./login'));
router.get('/logout', require('./logout'));

module.exports = router;
