const orderModel = require('../service/orderService');
const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

exports.getOrder = async (req, res, next) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      connection: connection
    };
    const result = await orderModel.getAllOrder(parametres);
    if (result.rows.length != 0) {
      res.status(200).json({ message: "Orders find successfully", result: result.rows[0] });
    }
    else {
      res.status(404).json({ error: "Order not found" });
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
  };
};

exports.getOrderById = async (req, res, next) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      id: req.params.id,
      connection: connection
    };
    const result = await orderModel.getOrderById(parametres);
    if (result.rows != 0) {
      res.status(200).json({ message: 'Order find successfully', result: result.rows[0] });
    }
    else {
      res.status(404).json({ error: 'Order not found' });
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
  };
};

exports.updateOrderById = async (req, res, next) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      id: req.params.id,
      body: req.body,
      connection: connection
    };
    const updatedOrder = await orderModel.updateOrder(parametres);
    if (updatedOrder.rowsAffected > 0) {
      res.status(200).json({ message: 'Order updated successfully' });
    }
    else {
      res.status(404).json({ error: 'Order not found' });
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
  };
};

exports.createOrder = async (req, res, next) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      body: req.body,
      connection: connection
    };
    const result = await orderModel.createOrderByItem(parametres);
    if (result.rowsAffected > 0) {
      res.status(200).json({ message: 'Order created successfully' });
    }
    else {
      res.status(400).json({ error: 'Cant create order' });
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
  };
};

exports.deleteOrderById = async (req, res, next) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres =
    {
      id: req.params.id,
      connection: connection
    }
    const result = await orderModel.deleteOrder(parametres);
    if (result.rowsAffected > 0) {
      res.status(200).json({ message: 'Order deleted successfully' });
    }
    else {
      res.status(404).json({ error: 'Order Not Found' });
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
  };
};

