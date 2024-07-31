const productModel = require('../models/productModel');
const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');

exports.getProduct = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      req: req,
      connection: connection
    };
    const product = await productModel.getAllProduct(parametres);
    if (product.rows != 0) {
      res.status(200).json({ message: 'Product found successfully', result: product.rows });
    }
    else {
      res.status(404).json({ message: 'Product not found' });
    }
  }
  catch (error) {
    res.status(500).json({ error: 'Database error' });
    throw error;
  }
}

exports.createProduct = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      req: req,
      connection: connection
    };
    const product = await productModel.createNewProduct(parametres);
    if (product.lastRowid != 0) {
      res.status(404).json({ message: 'Cant create product' });
    }
    else {
      res.status(200).json({ message: 'Product created successfully', result: product });
    }
  }
  catch (error) {
    res.status(500).json({ error: 'Database error' });
    throw error;
  }
}

exports.getProductById = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      req: req,
      connection: connection
    };
    const product = await productModel.getProductById(parametres);
    if (product.rows != 0) {
      res.status(200).json({ message: 'Product found successfully', result: product.rows });
    }
    else {
      res.status(404).json({ message: 'Product not found' });
    }
  }
  catch (error) {
    res.status(500).json({ error: 'Database error' });
    throw error;
  }
}

exports.deleteProductById = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      req: req,
      connection: connection
    };
    const product = await productModel.deleteProduct(parametres);
    if (product.lastRowid != 0) {
      res.status(200).json({ message: 'Product deleted successfully' });
    }
    else {
      res.status(404).json({ error: 'Product Not Found' });
    }
  }
  catch (error) {
    res.status(500).json({ error: 'Database error' });
    throw error;
  }
}

exports.updateProduct = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      req: req,
      connection: connection
    };
    const product = await productModel.updateProductById(parametres);
    if (product.lastRowid != 0) {
      res.status(200).json({ message: 'Product updated successfully', result: product });
    }
    else {
      res.status(404).json({ error: 'Product Not Found', result: product });
    }
  }
  catch (error) {
    res.status(500).json({ error: 'Database error' });
    throw error;
  }
}   