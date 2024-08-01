const userModel = require('../service/userService');
const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res, next) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
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
      next(error);
   } finally {
      if (connection) {
         try {
            await connection.close();
         }
         catch (error) {
            next(error);
         }
      }
   }
};

exports.createNewUser = async (req, res, next) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
         body: req.body,
         connection: connection
      };
      const result = await userModel.createUser(parameters);
      if (result.rowsAffected > 0) {
         res.status(200).json({ message: 'User add successfully' });
      }
      else {
         res.status(404).json({ error: 'Cant add user' });
      }
   }
   catch (error) {
      res.status(500).json({ error: 'Database error' });
      next(error);
   } finally {
      if (connection) {
         try {
            await connection.close();
         }
         catch (error) {
            next(error);
         }
      }
   }
};

exports.getUserById = async (req, res, next) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
         id: req.params.id,
         connection: connection
      };
      const result = await userModel.getById(parameters);
      if (result.rows != null) {
         res.status(200).json({ message: 'User found successfully', result: result.rows });
      }
      else {
         res.status(404).json({ message: 'User not found' });
      }
   }
   catch (error) {
      res.status(500).json({ error: 'Database error' });
      next(error);
   } finally {
      if (connection) {
         try {
            await connection.close();
         }
         catch (error) {
            next(error);
         }
      }
   }
};

exports.updateUserById = async (req, res, next) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
         body: req.body,
         id: req.params.id,
         connection: connection
      };
      const result = await userModel.updateUser(parameters);
      if (result.rowsAffected != null) {
         res.status(200).json({ message: 'User updated successfully' });
      }
      else {
         res.status(404).json({ message: 'User not found' });
      }
   }
   catch (error) {
      res.status(500).json({ error: 'Database error' });
      next(error);
   } finally {
      if (connection) {
         try {
            await connection.close();
         }
         catch (error) {
            next(error);
         }
      }
   }
};

exports.deleteUserById = async (req, res, next) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
         id: req.params.id,
         connection: connection
      }
      const result = await userModel.deleteUser(parameters);
      if (result.rowsAffected > 0) {
         res.status(200).json({ message: 'User deleted successfully' });
      }
      else {
         res.status(404).json({ error: 'User Not Found' });
      }
   }
   catch (error) {
      res.status(500).json({ error: 'Database error' });
      next(error);
   } finally {
      if (connection) {
         try {
            await connection.close();
         }
         catch (error) {
            next(error);
         }
      }
   }
}

exports.userGetToken = async (req, res, next) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
         body: req.body,
         connection: connection
      }
      const result = await userModel.userLogin(parameters);
      if (result.rows != null) {
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
      next(error);
   } finally {
      if (connection) {
         try {
            await connection.close();
         }
         catch (error) {
            next(error);
         }
      }
   }
}

exports.getUserOrder = async (req, res, next) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
         id: req.params.id,
         connection: connection
      };
      const result = await userModel.getOrderByUserId(parameters);
      if (result.rows != 0) {
         res.status(200).json({ massage: 'Order find successfully', result: result.rows[0] });
      }
      else {
         res.status(404).json({ error: 'Order/User not found' });
      }
   }
   catch (error) {
      res.status(500).json({ error: 'Database error' });
      next(error);
   } finally {
      if (connection) {
         try {
            await connection.close();
         }
         catch (error) {
            next(error);
         }
      }
   }
}

exports.deleteUserOrder = async (req, res, next) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
         userId: req.params.userId,
         orderId: req.params.orderId,
         connection: connection
      };
      const result = await userModel.deleteUserOrderById(parameters);
      if (result.rowsAffected > 0) {
         res.status(200).json({ massage: 'User order deleted successfully' });
      } else {
         res.status(404).json({ error: 'User/Order not found' });
      }
   }
   catch (error) {
      res.status(500).json({ error: 'Database error' });
      next(error);
   } finally {
      if (connection) {
         try {
            await connection.close();
         }
         catch (error) {
            next(error);
         }
      }
   }
}
