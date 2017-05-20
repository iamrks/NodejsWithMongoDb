var format = require('string-format');
var validator = require('../../common/validator');
var CONSTANTS = require('../../common/constant').CONSTANTS;
var VALIDATION_CODES = CONSTANTS.VALIDATION;
var REQUEST_CODES = CONSTANTS.REQUEST_CODES;

var User = function () {
    return {
        userId: 0,
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        status: false,
        createDate: null
    };
};

function GetObject(userRecord) {
    var user = new User();

    user.getUserId = () => {
        return user.userId;
    };

    user.setUserId = (userId) => {
        if (userId) {
            if (validator.isInteger(userId)) {
                user.userId = userId;
            }
            else {
                throw {
                    status: VALIDATION_CODES.FAIL,
                    error: format(VALIDATION_CODES.NOT_A_INTEGER, userId, 'userId')
                };
            }
        }
    };

    user.getFirstName = () => {
        return user.firstName;
    };

    user.setFirstName = (firstName) => {
        if (firstName) {
            if (firstName.length <= 50) {
                user.firstName = firstName;
            }
            else {
                throw {
                    status: VALIDATION_CODES.FAIL,
                    error: format(VALIDATION_CODES.VALUE_TOO_BIG, firstName, 'firstName')
                };
            }
        }
    };

    user.getLastName = () => {
        return user.lastName;
    };

    user.setLastName = (lastName) => {
        if (lastName) {
            if (lastName.length <= 50) {
                user.lastName = lastName;
            }
            else {
                throw {
                    status: VALIDATION_CODES.FAIL,
                    error: format(VALIDATION_CODES.VALUE_TOO_BIG, lastName, 'lastName')
                };
            }
        }
    };

    user.getEmail = () => {
        return user.email;
    };

    user.setEmail = (email) => {
        if (email) {
            if (validator.isEmail(email)) {
                user.email = email;
            }
            else {
                throw {
                    status: VALIDATION_CODES.FAIL,
                    error: VALIDATION_CODES.INVALID_EMAIL
                };
            }
        }
    };

    user.getPassword = () => {
        return user.password;
    };

    user.setPassword = (password) => {
        user.password = password;
    };

    user.getCreateDate = () => {
        return user.createDate;
    };

    user.setCreateDate = (createDate) => {
        user.createDate = createDate;
    };

    if (userRecord) {
        var errors = [];

        try {
            user.setUserId(userRecord.userId);
        }
        catch (e) {
            errors.push(e);
        }

        try {
            user.setFirstName(userRecord.firstName);
        }
        catch (e) {
            errors.push(e);
        }

        try {
            user.setLastName(userRecord.lastName);
        }
        catch (e) {
            errors.push(e);
        }

        try {
            user.setEmail(userRecord.email);
        }
        catch (e) {
            errors.push(e);
        }

        try {
            user.setPassword(userRecord.password);
        }
        catch (e) {
            errors.push(e);
        }

        try {
            user.setCreateDate(new Date().getTime());
        }
        catch (e) {
            errors.push(e);
        }

        if (errors.length > 0) {
            throw {
                status: REQUEST_CODES.FAIL,
                error: errors
            };
        }
    }

    return user;
}

function isValidModel(userObject) {
    var errors = [];
    var e;
    if (!userObject.getFirstName()) {
        e = {
            status: VALIDATION_CODES.FAIL,
            error: format(VALIDATION_CODES.REQUIRED, 'First Name')
        };
        errors.push(e);
    }
    if (!userObject.getLastName()) {
        e = {
            status: VALIDATION_CODES.FAIL,
            error: format(VALIDATION_CODES.REQUIRED, 'Last Name')
        };
        errors.push(e);
    }
    if (!userObject.getEmail()) {
        e = {
            status: VALIDATION_CODES.FAIL,
            error: format(VALIDATION_CODES.REQUIRED, 'Email')
        };
        errors.push(e);
    }
    if (!userObject.getPassword()) {
        e = {
            status: VALIDATION_CODES.FAIL,
            error: format(VALIDATION_CODES.REQUIRED, 'Password')
        };
        errors.push(e);
    }

    return errors;
}

module.exports.GetObject = GetObject;
module.exports.isValidModel = isValidModel;