const productModel = require('../service/productService');
const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');

exports.getProduct = async (req, res, next) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      connection: connection
    };
    const result = await productModel.getAllProduct(parametres);
    if (result.rows != 0) {
      res.status(200).json({ message: 'Product found successfully', result: result.rows });
    }
    else {
      res.status(404).json({ message: 'Product not found' });
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

exports.createProduct = async (req, res, next) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      body: req.body,
      connection: connection
    };
    const result = await productModel.createNewProduct(parametres);
    if (result.rowsAffected > 0) {
      res.status(200).json({ message: 'Product created successfully', result: product });
    }
    else {
      res.status(404).json({ message: 'Cant create product' });
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

exports.getProductById = async (req, res, next) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      id: req.params.id,
      connection: connection
    };
    const result = await productModel.getProductById(parametres);
    if (result.rows != null) {
      res.status(200).json({ message: 'Product found successfully', result: product.rows });
    }
    else {
      res.status(404).json({ message: 'Product not found' });
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

exports.deleteProductById = async (req, res, next) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      id: req.params.id,
      connection: connection
    };
    const result = await productModel.deleteProduct(parametres);
    if (result.rowsAffected > 0) {
      res.status(200).json({ message: 'Product deleted successfully' });
    }
    else {
      res.status(404).json({ error: 'Product Not Found' });
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

exports.updateProduct = async (req, res, next) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const parametres = {
      body: req.body,
      id: req.params.id,
      connection: connection
    };
    const product = await productModel.updateProductById(parametres);
    if (product.rowsAffected > 0) {
      res.status(200).json({ message: 'Product updated successfully', result: product });
    }
    else {
      res.status(404).json({ error: 'Product Not Found', result: product });
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