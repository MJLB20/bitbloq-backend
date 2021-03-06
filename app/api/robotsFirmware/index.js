'use strict';

var express = require('express'),
    controller = require('./robotsFirmware.controller.js'),
    auth = require('../../components/auth/auth.service'),
    router = express.Router();

router.get('/:robot/:version', controller.get);

router.post('/:robot/:version', auth.hasRole('admin'), controller.getMulterCreator().single('file'), controller.create);
router.delete('/:robot/:version', auth.hasRole('admin'), controller.delete);

module.exports = router;
