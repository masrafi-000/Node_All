const mongoos = require('mongoose');

const todoSchema = mongoos.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: mongoos.Types.ObjectId,
        ref: 'User',
    },
});

// instance methods
todoSchema.methods = {
    findActive() {
        return mongoos.model('Todo').find({ status: 'inactive' });
    },
};

// static methods
todoSchema.statics = {
    findByJS() {
        return this.find({ title: /js/i });
    },
};

// query helper
todoSchema.query = {
    byLanguage(language) {
        return this.find({ title: new RegExp(language, 'i') });
    },
};

module.exports = todoSchema;
