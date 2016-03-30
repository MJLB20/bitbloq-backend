'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../components/auth/auth.service');

var router = express.Router();

// HEAD
router.head('/:username', controller.usernameExists);

router.delete('/:id', auth.hasRole('admin'), controller.destroy);
// GET
router.get('/', auth.hasRole('admin'), controller.index);
router.get('/reset/:email', controller.resetPassword);
router.get('/email/:email', controller.getUserId);
router.get('/me', auth.isAuthenticated(), controller.me);

router.get('/:id', controller.show);

// POST
router.post('/', controller.create);
router.post('/social', controller.socialLogin);
router.post('/forgot', controller.emailToken);

// PUT
router.put('/me', auth.isAuthenticated(), controller.updateMe);
router.put('/me/properties', auth.isAuthenticated(), controller.updateMyProperties);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/social', auth.isAuthenticated(), controller.turnToLocal);

module.exports = router;