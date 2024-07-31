const express = require('express');
const router = express.Router();
const userContoller = require('../controller/userControler');
const errorHandler = require('../middleware/errorHandler');

/// get all users API
router.get('/', userContoller.getAllUsers);

/// create new user API
router.post('/', userContoller.createNewUser);

/// get,update,delete APIs user by id 
router.get('/:id', userContoller.getUserById);
router.put('/:id', userContoller.updateUserById);
router.delete('/:id', userContoller.deleteUserById);

/// user login api
router.post('/login', userContoller.userGetToken);

/// get,delete Users order APIs
router.get('/:id/order', userContoller.getUserOrder);
router.delete('/:userId/order/:orderId', userContoller.deleteUserOrder);

router.use(errorHandler);

module.exports = router;
