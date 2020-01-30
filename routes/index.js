var express = require('express');
var router = express.Router();

var catalog_controller = require('../controllers/catalogController');

/* GET home page. */
router.get('/', catalog_controller.home);

module.exports = router;
