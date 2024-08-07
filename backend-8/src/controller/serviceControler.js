const serviceModel = require('../service/serviceService');
const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

exports.getAllServiceList = async (req, res, next) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const parameters = {
            connection: connection
        };
        const result = await serviceModel.getAllService(parameters);
        if (result.rows != 0) {
            res.status(200).json({ message: "Service find successfully", result: result.rows });
        }
        else {
            res.status(404).json({ error: "Service not found" });
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

exports.createService = async (req, res, next) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const parameters = {
            body: req.body,
            connection: connection
        };
        const result = await serviceModel.createNewService(parameters);
        if (result.rowsAffected > 0) {
            res.status(200).json({ message: 'Service add successfully' });
        }
        else {
            res.status(400).json({ error: 'Cant create service' });
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

exports.getService = async (req, res, next) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const parameters = {
            id: req.params.id,
            connection: connection
        }
        const result = await serviceModel.getServiceById(parameters);
        if (result.rows != 0) {
            res.status(200).json({ message: 'Service find successfully', result: result.rows });
        }
        else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
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

exports.updateService = async (req, res, next) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const parameters = {
            body: req.body,
            id: req.params.id,
            connection: connection
        }
        const result = await serviceModel.updateServiceById(parameters);
        if (result.rowsAffected > 0) {
            res.status(200).json({ message: 'Service updated successfully' });
        }
        else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
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

exports.deleteService = async (req, res, next) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const parameters = {
            id: req.params.id,
            connection: connection
        }
        const result = await serviceModel.deleteServiceById(parameters);
        if (result.rowsAffected > 0) {
            res.status(200).json({ message: 'Service deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
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