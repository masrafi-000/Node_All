const express = require('express');
const mongoos = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/userSchema');

const router = express.Router();

const User = new mongoos.model('User', userSchema);

// Signup
router.post('/signup', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
    });
    await newUser
        .save()
        .then(() => {
            res.status(200).json({
                massage: 'Signup was successfully!',
            });
        })
        .catch((err) => {
            if (err) {
                res.status(500).json({
                    error: 'Signup failed!',
                });
            }
        });
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

            if (isValidPassword) {
                // genarate token
                const token = jwt.sign(
                    {
                        username: user[0].username,
                        userId: user[0]._id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '1h',
                    }
                );
                res.status(200).json({
                    access_token: token,
                    message: 'Login successgul!',
                });
            } else {
                res.status(401).json({
                    error: 'Authentication failed!',
                });
            }
        } else {
            res.status(401).json({
                error: 'Authentication failed!',
            });
        }
    } catch {
        res.status(401).json({
            error: 'Authentication failed!',
        });
    }
});

// GET ALL USER
router.get('/all', async (req, res) => {
    try {
        const users = await User.find({}).populate('todos');
        res.status(200).json({
            data: users,
            message: 'Success!',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'There was an error on the server side!',
        });
    }
});

module.exports = router;
