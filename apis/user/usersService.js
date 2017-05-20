var express = require('express');
var router = express.Router();
var format = require('string-format');
var mongoose = require('mongoose');
var mongoUtils = require('../../common/mongoUtils');
var USER = require('./user.js');
var CONSTANTS = require('../../common/constant').CONSTANTS;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;
var DB_ERROR_CODES = CONSTANTS.DB_ERROR_CODES;
var USER_CODES = CONSTANTS.USER_CODES;
var Schema = mongoose.Schema;
var UserSchema = new Schema(require('./userSchema').userSchema, { collection: 'users' });
var UserModel = mongoose.model('users', UserSchema);

// GET: Get List
router.route('/').get((req, res) => {
    try {
        getList(req, (result) => {
            res.json(result);
        });
    }
    catch (e) {
        res.json(e);
    }
});

// POST: Create
router.route('/').post((req, res) => {
    try {
        create(req.body, (result) => {
            res.json(result);
        });
    }
    catch (e) {
        res.json(e);
    }
});

// PUT: Update
router.route('/').put((req, res) => {
    try {
        update(req.body, (result) => {
            res.json(result);
        });
    }
    catch (e) {
        res.json(e);
    }
});

// PUT: Delete
router.route('/:id').delete((req, res) => {
    try {
        Delete(req.params.id, (result) => {
            res.json(result);
        });
    }
    catch (e) {
        res.json(e);
    }
});

// GET: Get User By userId
router.route('/:id').get((req, res) => {
    try {
        getByQuery({ 'userId': req.params.id }, (result) => {
            res.json(result);
        });
    }
    catch (e) {
        res.json(e);
    }
});

function getList(req, callback) {
    UserModel.find({}, (err, users) => {
        if (err) {
            return callback({
                status: DB_ERROR_CODES.FAIL,
                error: err
            });
        }
        else {
            return callback({
                status: REQUEST_CODES.SUCCESS,
                result: users
            });
        }
    });
}

function getByQuery(query, callback) {
    UserModel.find(query, (err, users) => {
        if (err) {
            return callback({
                status: DB_ERROR_CODES.FAIL,
                error: err
            });
        }
        else {
            return callback({
                status: REQUEST_CODES.SUCCESS,
                result: users[0]
            });
        }
    });
}

function create(user, callback) {
    var userObject;
    var errors = [];
    try {
        userObject = USER.GetObject(user);
    }
    catch (e) {
        errors.push(e);
        return callback({
            status: REQUEST_CODES.FAIL,
            error: e
        });
    }

    errors = USER.isValidModel(userObject);

    if (errors.length > 0) {
        return callback({
            status: REQUEST_CODES.FAIL,
            error: errors
        });
    }
    else {
        var userModel = new UserModel(userObject);
        mongoUtils.getNextIndex('userId', (err, nextId) => {
            userModel.userId = nextId;
            userModel.save((err, result) => {
                if (err) {
                    return callback({
                        status: DB_ERROR_CODES.FAIL,
                        error: err
                    });
                }
                else {
                    return callback({
                        status: REQUEST_CODES.SUCCESS,
                        result: format(USER_CODES.CREATE_SUCESS, userModel.userId)
                    });
                }
            });
        });
    }
}

function update(user, callback) {
    var userObject;
    var errors = [];
    try {
        userObject = USER.GetObject(user);
    }
    catch (e) {
        return callback({
            status: REQUEST_CODES.FAIL,
            error: e
        });
    }

    errors = USER.isValidModel(userObject);

    if (errors.length > 0) {
        return callback({
            status: REQUEST_CODES.FAIL,
            error: errors
        });
    }
    else {
        UserModel.update({ 'userId': user.userId }, { $set: user }, (err, result) => {
            if (err) {
                return callback({
                    status: DB_ERROR_CODES.FAIL,
                    error: err
                });
            }
            else {
                return callback({
                    status: REQUEST_CODES.SUCCESS,
                    result: format(USER_CODES.UPDATE_SUCCESS, user.userId)
                });
            }
        });
    }
}

function Delete(userId, callback) {
    UserModel.remove({ 'userId': userId }, (err, dbResult) => {
        console.log('dbResult.result : ', dbResult.result);
        if (err) {
            return callback({
                status: DB_ERROR_CODES.FAIL,
                error: err
            });
        }
        else {
            if (dbResult.result.n > 0) {
                return callback({
                    status: REQUEST_CODES.SUCCESS,
                    result: format(USER_CODES.DELETE_SUCCESS, userId)
                });
            }
            else {
                return callback({
                    status: REQUEST_CODES.FAIL,
                    result: format(USER_CODES.USER_NOT_FOUND, userId)
                });
            }
        }
    });
}

module.exports = router;
module.exports.getList = getList;
module.exports.getByQuery = getByQuery;
module.exports.create = create;
module.exports.update = update;
module.exports.Delete = Delete;