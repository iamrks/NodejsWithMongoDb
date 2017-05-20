module.exports.userSchema = {
    userId: {
        type: Number,
        unique: true,
        required: true,
        index: true
    },
    firstName: {
        type: String,
        required: true,
        index: true
    },
    lastName: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createDate: {
        type: Number,
        required: true
    }
};