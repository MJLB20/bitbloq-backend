'use strict';

var Center = require('./models/center.model.js'),
    UserFunctions = require('../user/user.functions.js'),
    async = require('async');


/**
 * Create center
 */
exports.addTeacher = function(req, res) {
    var userId = req.user._id,
        newTeacherEmails = req.body,
        centerId = req.params.centerId;
    async.parallel([
        UserFunctions.getCenterWithUserAdmin.bind(UserFunctions, userId, centerId),
        UserFunctions.getAllUsersByEmails.bind(UserFunctions, newTeacherEmails)
    ], function(err, result) {
        if (err) {
            console.log(err);
            res.sendStatus(401);
        } else if (!result) {
            res.sendStatus(304);
        } else {
            UserFunctions.addAllTeachers(result[1], result[0], function(err, newuser) {
                if (err) {
                    console.log(err);
                    res.status(err.code).send(err);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
};

/**
 * Create an exercise
 */
exports.createExercise = function(req, res) {

};

/**
 * Create task
 */
exports.createTask = function(req, res) {

};

/**
 * Create group
 */
exports.createGroup = function(req, res) {

};

/**
 * Create center
 */
exports.createCenter = function(req, res) {

};

/**
 * Get teachers in a center
 */
exports.getTeachers = function(req, res) {
    var userId = req.user._id,
        centerId = req.params.centerId;
    async.waterfall([
        UserFunctions.getCenterWithUserAdmin.bind(UserFunctions, userId, centerId),
        function(centerId, next) {
            UserFunctions.getAllTeachers(centerId, next);
        }
    ], function(err, result) {
        if (err) {
            console.log(err);
            res.sendStatus(401);
        } else if (!result) {
            res.sendStatus(304);
        } else {
            res.send(result);
        }
    });
};

/**
 * Get info of exercise by id
 */
exports.getExercise = function(req, res) {

};

/**
 * Get a exercise by its task
 */
exports.getExerciseByTask = function(req, res) {

};

/**
 * Get student task
 */
exports.getTask = function(req, res) {

};

/**
 * Get student group
 */
exports.getGroup = function(req, res) {

};

/**
 * Get student group by its teacher
 */
exports.getGroupByTeacher = function(req, res) {

};

/**
 * Get center
 */
exports.getCenter = function(req, res) {

};

/**
 * Update an exercise ir user is owner
 */
exports.updateExercise = function(req, res) {

};

/**
 * Update a task if user is owner
 */
exports.updateTask = function(req, res) {

};

/**
 * Update a student group
 */
exports.updateGroup = function(req, res) {

};

/**
 * Update center information
 */
exports.updateCenter = function(req, res) {

};

/**
 * Delete an exercise if user is owner
 */
exports.deleteExercise = function(req, res) {

};

/**
 * Delete a group if user is owner
 */
exports.deleteGroup = function(req, res) {

};


/**
 * Delete a task if user is owner
 */
exports.deleteTask = function(req, res) {

};

/**
 * Delete a teacher in a center
 */
exports.deleteTeacher = function(req, res) {
    var userId = req.user._id,
        centerId = req.params.centerId,
        teacherId = req.params.teacherId;
    async.waterfall([
        UserFunctions.getCenterWithUserAdmin.bind(UserFunctions, userId, centerId),
        function(centerId, next) {
            UserFunctions.deleteTeacher(teacherId, centerId, next);
        }
    ], function(err, result) {
        if (err) {
            console.log(err);
            res.sendStatus(401);
        } else if (!result) {
            res.sendStatus(304);
        } else {
            res.sendStatus(200);
        }
    });
};

/**
 * Make anonymous a center if user is owner
 */
exports.anonCenter = function(req, res) {

};