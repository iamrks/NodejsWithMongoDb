const CONSTANTS = {
    VALIDATION: {
        FAIL: 'Validation Error',
        NOT_A_INTEGER: '{0} is not a valid integer value for field {1}',
        VALUE_TOO_BIG: 'field {0} data is too large for field {1}',
        INVALID_EMAIL: 'Please enter valid Email address',
        REQUIRED: 'field {0} is required.'
    },
    REQUEST_CODES: {
        SUCCESS: 'Success',
        FAIL: 'Error in Request',
        WARNING: 'Warning',
        ERROR: 'Error'
    },
    DB_ERROR_CODES: {
        FAIL: 'Error in Database'
    },
    USER_CODES: {
        CREATE_SUCESS: 'User created successfully with userId {0}',
        DELETE_SUCCESS: 'User with userId {0} removed successfully',
        UPDATE_SUCCESS: 'User with userId {0} updated successfully',
        USER_NOT_FOUND: 'User does not exist with userId {0}'
    }
};

module.exports.CONSTANTS = CONSTANTS;