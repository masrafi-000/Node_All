const express = require('express');
const mongoos = require('mongoose');
const todoSchema = require('../schemas/todoSchema');
const userSchema = require('../schemas/userSchema');
const checkLogin = require('../middleware/checkLogin');

const router = express.Router();

const Todo = new mongoos.model('Todo', todoSchema);
const User = new mongoos.model('User', userSchema);

// GET All THE TODOS
router.get('/', checkLogin, async (req, res) => {
    await Todo.find()
        .populate('user', 'name username -_id')
        .select({
            _id: 0,
            date: 0,
        })
        .limit(2)
        .then((data) => {
            res.status(200).json({
                result: data,
                massage: 'Success!',
            });
        })
        .catch((err) => {
            if (err) {
                res.status(500).json({
                    error: 'There was a server side error',
                });
            }
        });
});

router.get('/js', async (req, res) => {
    const data = await Todo.findByJS();
    res.status(200).json({
        data,
    });
});

router.get('/language', async (req, res) => {
    const data = await Todo.find().byLanguage('react');
    res.status(200).json({
        data,
    });
});

// GET ACTIVE TODOS
router.get('/active', async (req, res) => {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({
        data,
    });
});

// GET A TODO by ID
router.get('/:id', async (req, res) => {
    await Todo.find({ _id: req.params.id })
        .then((data) => {
            res.status(200).json({
                result: data,
                massage: 'Success!',
            });
        })
        .catch((err) => {
            if (err) {
                res.status(500).json({
                    error: 'There was a server side error',
                });
            }
        });
});

// POST A TODO
router.post('/', checkLogin, async (req, res) => {
    const newTodo = new Todo({
        ...req.body,
        user: req.userId,
    });
    try {
        const todo = await newTodo.save();
        await User.updateOne(
            {
                _id: req.userId,
            },
            {
                $push: {
                    todos: todo._id,
                },
            },
        );
        res.status(200).json({
            massage: 'Todo was inserted successfully!',
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: 'There was a server side error',
        });
    }
});

// POST MULTIPLE TODO
router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body)
        .then(() => {
            res.status(200).json({
                massage: 'Todo was inserted successfully!',
            });
        })
        .catch((err) => {
            if (err) {
                res.status(500).json({
                    error: 'There was a server side error',
                });
            }
        });
});

// PUT TODO
router.put('/:id', async (req, res) => {
    await Todo.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { status: 'active' } },
        { new: true, useFindAndModify: false },
    )
        .then(() => {
            res.status(200).json({
                massage: 'Todo was updated successfully!',
            });
        })
        .catch((err) => {
            if (err) {
                res.status(500).json({
                    error: 'There was a server side error',
                });
            }
        });
});

// DELETE TODO
router.delete('/:id', async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({
                massage: 'Todo was deleted successfully!',
            });
        })
        .catch((err) => {
            if (err) {
                res.status(500).json({
                    error: 'There was a server side error',
                });
            }
        });
});

module.exports = router;
