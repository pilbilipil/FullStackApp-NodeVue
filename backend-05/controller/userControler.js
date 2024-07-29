const userModel = require('../models/userModel');

exports.getAllUsers = async (req,res) => {
   try {
      const users = await userModel.getAllUser();
      res.json(users);
   }
   catch (error) {
      console.log(error);
   }
};

exports.createNewUser = async (req, res) => {
   try {
      const createUser = await userModel.createUser(req);
      res.json(createUser);
   }
   catch (error) {
      res.status(500).json({ error: 'Database error' });
   }
};

exports.getUserById = async (req, res) => {
   try {
      const getByIds = await userModel.getById(req);
      res.json(getByIds);
   }
   catch (error) {
      console.log(error);
   }
};

exports.updateUserById = async (req, res) => {
   try {
      const updatedUser = await userModel.updateUser(req);
      res.json(updatedUser);
   }
   catch (error) {
      console.log(error);
   }
};

exports.deleteUserById = async (req, res) => {
   try {
      const deletedUser = await userModel.deleteUser(req);
      res.json(deletedUser);
   }
   catch (error) {
      console.log(error);
   }
}

exports.userGetToken = async (req, res) => {
   try {
      const userToken = await userModel.userLogin(req);
      res.json(userToken);
   }
   catch (error) {
      console.log(error);
   }
}

exports.getUserOrder = async (req, res) => {
   try {
      const userOrders = await userModel.getOrderByUserId(req);
      res.json(userOrders);
   }
   catch (error) {
      console.log(error);
   }
}

exports.deleteUserOrder = async (req, res) => {
   try {
      const userDeletedOrder = await userModel.deleteUserOrderById(req);
      res.json(userDeletedOrder);
   }
   catch (error) {
      console.log(error);
   }
}
