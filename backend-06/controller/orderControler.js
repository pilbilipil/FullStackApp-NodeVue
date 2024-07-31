const orderModel = require('../models/orderModel');
const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');

exports.getOrder = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await orderModel.getAllOrder(connection);
    if (result.rows != 0) {
      res.status(200).json({ massage: "Orders find successfully", result: result.rows });
    }
    else {
      res.status(404).json({ error: "Order not found" });
    }
  }
  catch (error) {
    res.status(500).json({ error: 'Database error' });
    throw error;
  };
};

exports.getOrderById = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      req: req,
      connection: connection
    };
    const result = await orderModel.getOrderById(parametres);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    }
    else {
      res.status(200).json({ massage: 'Order find successfully', result: result.rows[0] });
    }
  }
  catch (error) {
    res.status(500).json({ error: 'Database error' });
    throw error;
  }
}

exports.updateOrderById = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      req: req,
      connection: connection
    };
    const updatedOrder = await orderModel.updateOrder(parametres);
    if (updatedOrder.rowsAffected === 0) {
      res.status(404).json({ message: 'Order not found' });
    }
    else {
      res.status(200).json({ message: 'Order updated successfully' });
    }
  }
  catch (error) {
    res.status(500).json({ error: 'Database error' });
    throw error;
  }
}

exports.createOrder = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      req: req,
      connection: connection
    };
    const result = await orderModel.createOrderByItem(parametres);
    console.log(result);
    console.log(result.rowsAffected);
    console.log(result.rows);
    console.log(result.lastRowid);
    if (result.rowsAffected != 0) {
      res.status(200).json({ message: 'Order add successfully' });
    }
    else {
      res.status(404).json({ error: 'Cant add order' });
    }
  }
  catch (error) {
    res.status(500).json({ error: 'Database error' });
    throw error;
  }
}

exports.deleteOrderById = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres =
    {
      req: req,
      connection: connection
    }
    const order = await orderModel.deleteOrder(parametres);
    console.log(order);
    if (order.rowsAffected != 0) {
      res.status(200).json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ error: 'Order Not Found' });
    }
  }
  catch (error) {
    res.status(500).json({ error: 'Database error' });
    throw error;
  }
}

