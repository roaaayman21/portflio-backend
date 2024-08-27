const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../utilize/auth');

router.post('/', userController.createUser);
router.get('/', auth, userController.getUsers);
router.post('/login', userController.login);

module.exports = router;
