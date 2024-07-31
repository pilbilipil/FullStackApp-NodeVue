const userModel = require('../models/userModel');
const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
         req: req,
         connection: connection
      };
      const result = await userModel.getAllUser(parameters);
      if (result.rows != 0) {
         res.status(200).json({ massage: "User find successfully", result });
      }
      else {
         res.status(404).json({ error: "User not found" });
      }
   }
   catch (error) {
      res.status(500).json({ error: 'Database error' });
      throw error;
   }
};

exports.createNewUser = async (req, res) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
         req: req,
         connection: connection
      };
      const result = await userModel.createUser(parameters);
      if (result.rowsAffected != 0) {
         res.status(200).json({ message: 'User add successfully' });
      }
      else {
         res.status(404).json({ error: 'Cant add user' });
      }
   }
   catch (error) {
      res.status(500).json({ error: 'Database error' });
      throw error;
   }
};

exports.getUserById = async (req, res) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
         req: req,
         connection: connection
      };
      const result = await userModel.getById(parameters);
      if (result.rows != 0) {
         res.status(200).json({ message: 'User found successfully', result: result.rows });
      }
      else {
         res.status(404).json({ message: 'User not found' });
      }
   }
   catch (error) {
      res.status(500).json({ error: 'Database error' });
      throw error;
   }
};

exports.updateUserById = async (req, res) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
         req: req,
         connection: connection
      };
      const result = await userModel.updateUser(parameters);
      if (result.rowsAffected === 0) {
         res.status(404).json({ message: 'User not found' });
      }
      else {
         res.status(200).json({ message: 'User updated successfully' });
      }
   }
   catch (error) {
      res.status(500).json({ error: 'Database error' });
      throw error;
   }
};

exports.deleteUserById = async (req, res) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
         req: req,
         connection: connection
      }
      const result = await userModel.deleteUser(parameters);
      if (result.lastRowid != 0) {
         res.status(200).json({ message: 'User deleted successfully' });
      }
      else {
         res.status(404).json({ error: 'User Not Found' });
      }
   }
   catch (error) {
      res.status(500).json({ error: 'Database error' });
      throw error;
   }
}

exports.userGetToken = async (req, res) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
         req: req,
         connection: connection
      }
      const result = await userModel.userLogin(parameters);
      if (result.rows != 0) {
         const secret = 'verystrongsecret123';
         const user = result.rows[0];
         const token = jwt.sign({ email: req.body.email, password: req.body.password }, secret);
         const userInfo = { user, token };
         res.status(200).json({ message: 'User token has been successfully created', userInfo });
      }
      else {
         res.status(404).json({ error: 'Cant create token' });
      }
   }
   catch (error) {
      res.status(500).json({ error: 'Database error' });
      throw error;
   }
}

exports.getUserOrder = async (req, res) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
         req: req,
         connection: connection
      };
      const result = await userModel.getOrderByUserId(parameters);
      /// (Order find successfully) when error
      if (result.rows != 0) {
         res.status(200).json({ massage: 'Order find successfully', result: result.rows[0] });
      }
      else {
         res.status(404).json({ error: 'Order/User not found' });
      }
      /// (Order find successfully) when error
   }
   catch (error) {
      res.status(500).json({ error: 'Database error' });
      throw error;
   }
}

exports.deleteUserOrder = async (req, res) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
         req: req,
         connection: connection
      };
      const result = await userModel.deleteUserOrderById(parameters);
      if (result.rowsAffected === 0) {
         res.status(404).json({ error: 'User/Order not found' });
      } else {
         res.status(200).json({ massage: 'User order deleted successfully' });
      }
   }
   catch (error) {
      res.status(500).json({ error: 'Database error' });
      throw error;
   }
}
