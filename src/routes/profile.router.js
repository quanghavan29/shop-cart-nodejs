const express = require('express');

const router = express.Router();

const profileController = require('../controllers/profile.controller');

const restrict = require('../middlewares/middlewares');

router.get('/', restrict, profileController.profile);

module.exports = router;