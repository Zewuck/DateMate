const express = require('express');
const loginController = require('../Controllers/LoginControllers')

const router = express.Router();

router.get('/', loginController.usersRequest);
router.get('/login', loginController.login);
router.post('/login', loginController.auth);
router.get('/register', loginController.register);
router.post('/register', loginController.storeUser);
router.get('/logout', loginController.logout);
router.get('/citas', loginController.citations)

module.exports = router