const serviceModel = require('../models/serviceModel');
const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');

exports.getAllServiceList = async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const parameters = {
            req: req,
            connection: connection
        };
        const result = await serviceModel.getAllService(parameters);
        if (result.rows != 0) {
            res.status(200).json({ massage: "Service find successfully", result: result.rows });
        }
        else {
            res.status(404).json({ error: "Service not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Database error' });
        throw error;
    }
};

exports.createService = async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const parameters = {
            req: req,
            connection: connection
        };
        const result = await serviceModel.createNewService(parameters);
        if (result.rowsAffected != 0) {
            res.status(200).json({ message: 'Service add successfully' });
        }
        else {
            res.status(404).json({ error: 'Cant add service' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Database error' });
        throw error;
    }
};

exports.getService = async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const parameters = {
            req: req,
            connection: connection
        }
        const result = await serviceModel.getServiceById(parameters);
        if (result.rows != 0) {
            res.status(200).json({ massage: 'Service find successfully', result: result.rows });
        }
        else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
        throw error;
    }
}

exports.updateService = async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const parameters = {
            req: req,
            connection: connection
        }
        const result = await serviceModel.updateServiceById(parameters);
        if (result.rowsAffected != 0) {
            res.status(200).json({ massage: 'Service updated successfully' });
        }
        else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
        throw error;
    }
}

exports.deleteService = async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const parameters = {
            req: req,
            connection: connection
        }
        const result = await serviceModel.deleteServiceById(parameters);
        if (result.rowsAffected != 0) {
            res.status(200).json({ massage: 'Service deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
        throw error;
    }
}