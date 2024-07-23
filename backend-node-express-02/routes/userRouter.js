const express = require('express');
const router = express.Router();
const userContoller = require('../controller/userControler');

router.get('/user', userContoller.getAllUsers);
router.post('/user', userContoller.createNewUser);
router.get('/user/:id', userContoller.getUserById);
router.put('/user/:id', userContoller.getUserById);

module.exports = router;
