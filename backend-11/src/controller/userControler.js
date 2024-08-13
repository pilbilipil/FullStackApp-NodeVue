const userService = require('../service/userService');
const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res, next) => {
   let connection;
   try {
      connection = await oracledb.getConnection(dbConfig);
      const parameters = {
         connection: connection
      };
      const result = await userService.getAllUser(parameters);
      if (result.rows != 0) {
         res.status(200).json({ message: "User find successfully", result });
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
      const result = await userService.createUser(parameters);
      if (result.rowsAffected > 0) {
         res.status(200).json({ message: 'User add successfully' });
      }
      else {
         res.status(400).json({ error: 'User creation failed' });
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
      const result = await userService.getById(parameters);
      if (result.rows && result.rows.length > 0) {
         res.status(200).json({ message: 'User found successfully', result: result.rows });
      }
      else {
         res.status(404).json({ error: 'User not found' });
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
      const result = await userService.updateUser(parameters);
      if (result.rowsAffected > 0) {
         res.status(200).json({ message: 'User updated successfully' });
      }
      else {
         res.status(404).json({ error: 'User not found' });
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
      const result = await userService.deleteUser(parameters);
      if (result.rowsAffected > 0) {
         res.status(200).json({ message: 'User deleted successfully' });
      }
      else {
         res.status(404).json({ error: 'User not found' });
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
      const result = await userService.userLogin(parameters);
      if (result.rows && result.rows.length > 0) {
         const secret = 'verystrongsecret123';
         const user = result.rows[0];
         const token = jwt.sign({ email: req.body.email, password: req.body.password }, secret);
         const userInfo = { user, token };
         res.status(200).json({ message: 'User token has been successfully created', userInfo });
      }
      else {
         res.status(400).json({ error: 'Invalid email/password' });
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
      const result = await userService.getOrderByUserId(parameters);
      if (result.rows != 0) {
         res.status(200).json({ message: 'Order find successfully', result: result.rows });
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
      const result = await userService.deleteUserOrderById(parameters);
      if (result.rowsAffected > 0) {
         res.status(200).json({ message: 'User order deleted successfully' });
      } else {
         res.status(400).json({ error: 'Invalid User/Order' });
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
