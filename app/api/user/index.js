'use strict';

var express = require('express');
var controller = require('./user.controller.js');
var auth = require('../../components/auth/auth.service');

var router = express.Router();

// DELETE
router.delete('/all', auth.hasRole('admin'), controller.deleteAll);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

// HEAD
router.head('/:username', controller.usernameExists);
router.head('/:id/ban', auth.hasRole('admin'), controller.banUserInForum);
router.head('/:id/unban', auth.hasRole('admin'), controller.unbanUserInForum);

// GET
router.get('/', auth.hasRole('admin'), controller.index);
router.get('/email/:email', controller.getUserId);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/banned', controller.showBannedUsers);
router.get('/under14authorization/:token', controller.getUser);

router.get('/:id', controller.show);

// POST
router.post('/', controller.create);
router.post('/social', auth.getUser(), controller.socialLogin);
router.post('/forgot', controller.emailToken);
router.post('/all', auth.hasRole('admin'), controller.createAll);

// PUT
router.put('/me', auth.isAuthenticated(), controller.updateMe);
router.put('/me/password', auth.isAuthenticated(), controller.changePasswordAuthenticated);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/social', auth.isAuthenticated(), controller.turnToLocal);
router.put('/under14authorization', controller.authorizeUser);

module.exports = router;
