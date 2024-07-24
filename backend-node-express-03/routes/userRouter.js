const express = require('express');
const router = express.Router();
const userContoller = require('../controller/userControler');

/// get all users API
router.get('/user', userContoller.getAllUsers);

/// create new user API
router.post('/user', userContoller.createNewUser);

/// get,update,delete APIs user by id 
router.get('/user/:id', userContoller.getUserById);
router.put('/user/:id', userContoller.updateUserById);
router.delete('/user/:id', userContoller.deleteUserById);

/// user login api
router.post('/user/login', userContoller.userGetToken);

/// get,delete Users order APIs
router.get('/user/:id/order', userContoller.getUserOrder);
router.delete('/user/:userId/order/:orderId' , userContoller.deleteUserOrder);


module.exports = router;
