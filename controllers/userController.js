const User = require('../models/UserSchema');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).json(user);
};

exports.getUsers = async (req, res) => {
    const users = await User.find({}, 'username');
    res.status(200).json(users);
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json('Wrong username or password');
    }
    const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );
    res.status(200).json({ token });
};
