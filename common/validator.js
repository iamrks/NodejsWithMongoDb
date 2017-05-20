var emailValidator = require('email-validator');

module.exports = {
    isInteger: (value) => { 
        return value == parseInt(value, 10); 
    },
    isEmail: (email) => {
        return emailValidator.validate(email);
    }
};