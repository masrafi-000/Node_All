const mongoos = require('mongoose');

const userSchema = mongoos.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
});

module.exports = userSchema;
