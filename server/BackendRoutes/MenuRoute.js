const express = require('express');
const router = express.Router();
const controller = require('../BackendControllers/MenuController');

router.get('/', controller.getMenuItems);

module.exports = router;
