const oracledb = require('oracledb');
const serviceController = require('../controller/serviceControler');
const serviceService = require('../service/serviceService');

jest.mock('oracledb', () => ({
    getConnection: jest.fn(),
}));
jest.mock('../service/serviceService');

describe('serviceController.getAllServiceList', () => {
    let req, res, next, connection;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        connection = {
            execute: jest.fn()
        };
        oracledb.getConnection.mockResolvedValue(connection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return 200 - Service found', async () => {
        const mockUsers = { rows: [{ id: 1, name: 'washing' }] };
        const result = { rows: [{ id: 1, name: 'washing' }] };
        serviceService.getAllService.mockResolvedValue(mockUsers);

        await serviceController.getAllServiceList(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(serviceService.getAllService).toHaveBeenCalledWith({ connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ massage: "Service find successfully", result: result.rows });

    });

    test('should return 404 - Service not found', async () => {
        const mockUsers = { rows: [] };
        serviceService.getAllService.mockResolvedValue(mockUsers);

        await serviceController.getAllServiceList(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(serviceService.getAllService).toHaveBeenCalledWith({ connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Service not found' });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await serviceController.getAllServiceList(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('serviceController.createService', () => {

    let req, res, next, connection;

    beforeEach(() => {
        req = {
            body: {
                price: 12000,
                service: 'newService'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        connection = {
            execute: jest.fn()
        };
        oracledb.getConnection.mockResolvedValue(connection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    test('should return 200 - service created successfully', async () => {
        const mockResult = { rowsAffected: 1 };
        serviceService.createNewService.mockResolvedValue(mockResult);

        await serviceController.createService(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(serviceService.createNewService).toHaveBeenCalledWith({ body: req.body, connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Service add successfully' });
    });

    test('should return 400 - service creation fails', async () => {
        const mockResult = { rowsAffected: 0 };
        serviceService.createNewService.mockResolvedValue(mockResult);

        await serviceController.createService(req, res, next);
        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(serviceService.createNewService).toHaveBeenCalledWith({ body: req.body, connection });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Cant create service' })
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await serviceController.createService(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('serviceController.getServiceById', () => {

    let req, res, next, connection;

    beforeEach(() => {
        req = {
            params: {
                id: 1
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        connection = {
            execute: jest.fn()
        };
        oracledb.getConnection.mockResolvedValue(connection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    test('should return 200 - service created successfully', async () => {
        const mockResult = { rows: [{ price: 12000, service: 'newService' }] };
        const result = { rows: [{ price: 12000, service: 'newService' }] }
        serviceService.getServiceById.mockResolvedValue(mockResult);

        await serviceController.getService(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(serviceService.getServiceById).toHaveBeenCalledWith({ id: req.params.id, connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ massage: 'Service find successfully', result: result.rows });
    });

    test('should return 404 - service not found', async () => {
        const mockResult = {rows: []};
        serviceService.getServiceById.mockResolvedValue(mockResult);

        await serviceController.getService(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(serviceService.getServiceById).toHaveBeenCalledWith({ id: req.params.id, connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Service not found' });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await serviceController.getService(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('serviceController.updateServiceById', () => {

    let req, res, next, connection;

    beforeEach(() => {
        req = {
            params: {
                id: 1
            },
            body: {
                price: 14000,
                serviceType: "updatedService",
                updatedUser: 'ADMIN1',
                updatedTime: '07/11/2024'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        connection = {
            execute: jest.fn()
        };
        oracledb.getConnection.mockResolvedValue(connection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    test('should return 200 - service updated successfully', async () => {
        const mockResult = { rowsAffected: 1 };
        serviceService.updateServiceById.mockResolvedValue(mockResult);

        await serviceController.updateService(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(serviceService.updateServiceById).toHaveBeenCalledWith({ id: req.params.id, body: req.body , connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ massage: 'Service updated successfully' });
    });

    test('should return 404 - service not found', async () => {
        const mockResult = { rowsAffected: 0 };
        serviceService.updateServiceById.mockResolvedValue(mockResult);

        await serviceController.updateService(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(serviceService.updateServiceById).toHaveBeenCalledWith({ id: req.params.id, body: req.body , connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Service not found' });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await serviceController.updateService(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('serviceController.deleteServiceByid', () => {
    let req, res, next, connection;

    beforeEach(() => {
        req = {
            params: {
                id: 1
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        connection = {
            execute: jest.fn()
        };
        oracledb.getConnection.mockResolvedValue(connection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return 200 - service deleted successfully', async () => {
        const mockResult = { rowsAffected: 1 };
        serviceService.deleteServiceById.mockResolvedValue(mockResult);

        await serviceController.deleteService(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(serviceService.deleteServiceById).toHaveBeenCalledWith({ id: req.params.id, connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ massage: 'Service deleted successfully'});
    });

    test('should return 404 - service not found', async () => {
        const mockResult = { rowsAffected: 0 };
        serviceService.deleteServiceById.mockResolvedValue(mockResult);

        await serviceController.deleteService(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(serviceService.deleteServiceById).toHaveBeenCalledWith({ id: req.params.id, connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Service not found' });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await serviceController.deleteService(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});
