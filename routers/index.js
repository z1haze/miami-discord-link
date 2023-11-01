const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/api', require('./api'));
router.use('*', (req, res) => res.render('pages/index'));

module.exports = router;
