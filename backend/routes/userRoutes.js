const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const verifyToken = require('../middlewares/mwVerifyToken');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.delete('/:id', userController.deleteUser);
router.get('/:id', userController.getUserById);
router.get('/', verifyToken('admin'), userController.getUser)

module.exports = router;
