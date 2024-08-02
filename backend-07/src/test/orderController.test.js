const oracledb = require('oracledb');
const orderController = require('../controller/orderControler');
const orderService = require('../service/orderService');

jest.mock('oracledb', () => ({
    getConnection: jest.fn(),
}));
jest.mock('../service/orderService');

describe('orderController.getAllOrder', () => {
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

    test('should return 200 - order found', async () => {
        const mockUsers = { rows: [{ id: 1, orderStatusId: 3 }] };
        const result = { rows: [{ id: 1, orderStatusId: 3 }] };
        orderService.getAllOrder.mockResolvedValue(mockUsers);

        await orderController.getOrder(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(orderService.getAllOrder).toHaveBeenCalledWith({ connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ massage: "Orders find successfully", result: result.rows[0] });
    });

    test('should return 404 - order not found', async () => {
        const mockUsers = { rows: [] };
        orderService.getAllOrder.mockResolvedValue(mockUsers);

        await orderController.getOrder(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(orderService.getAllOrder).toHaveBeenCalledWith({ connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Order not found" });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await orderController.getOrder(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('orderController.getOrderById', () => {
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

    test('should return 200 - order found', async () => {
        const mockUsers = { rows: [{ id: 1, orderStatusId: 3 }] };
        const result = { rows: [{ id: 1, orderStatusId: 3 }] };
        orderService.getOrderById.mockResolvedValue(mockUsers);

        await orderController.getOrderById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(orderService.getOrderById).toHaveBeenCalledWith({ id: req.params.id , connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ massage: "Order find successfully", result: result.rows[0] });
    });

    test('should return 404 - order not found', async () => {
        const mockUsers = { rows: [] };
        orderService.getOrderById.mockResolvedValue(mockUsers);

        await orderController.getOrderById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(orderService.getOrderById).toHaveBeenCalledWith({id: req.params.id , connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Order not found' });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await orderController.getOrderById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('orderController.updateOrderById', () => {
    let req, res, next, connection;

    beforeEach(() => {
        req = {
            params: {
                id: 1
            },
            body: {
                userId: 1,
                orderStatusId: 4,
                updateUser: 'ADIMN1'
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

    test('should return 200 - order updated successfully', async () => {
        const mockUsers = { rowsAffected: 1 };
        orderService.updateOrder.mockResolvedValue(mockUsers);

        await orderController.updateOrderById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(orderService.updateOrder).toHaveBeenCalledWith({ id: req.params.id, body: req.body , connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Order updated successfully' });
    });

    test('should return 404 - order not found', async () => {
        const mockUsers = { rowsAffected: 0 };
        orderService.updateOrder.mockResolvedValue(mockUsers);

        await orderController.updateOrderById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(orderService.updateOrder).toHaveBeenCalledWith({id: req.params.id, body: req.body , connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Order not found' });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await orderController.updateOrderById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('orderController.createOrder', () => {
    let req, res, next, connection;

    beforeEach(() => {
        req = {
            body: {
                productId: 12,
                serviceId: 3
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

    test('should return 200 - order created successfully', async () => {
        const mockUsers = { rowsAffected: 1 };
        orderService.createOrderByItem.mockResolvedValue(mockUsers);

        await orderController.createOrder(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(orderService.createOrderByItem).toHaveBeenCalledWith({body: req.body , connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Order created successfully' });
    });

    test('should return 400 - Cant create order', async () => {
        const mockUsers = { rowsAffected: 0 };
        orderService.createOrderByItem.mockResolvedValue(mockUsers);

        await orderController.createOrder(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(orderService.createOrderByItem).toHaveBeenCalledWith({body: req.body , connection });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Cant create order' });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await orderController.createOrder(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('orderController.deleteOrderById', () => {
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

    test('should return 200 - order deleted successfully', async () => {
        const mockUsers = { rowsAffected: 1 };
        orderService.deleteOrder.mockResolvedValue(mockUsers);

        await orderController.deleteOrderById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(orderService.deleteOrder).toHaveBeenCalledWith({id: req.params.id , connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Order deleted successfully' });
    });

    test('should return 404 - order not found', async () => {
        const mockUsers = { rowsAffected: 0 };
        orderService.deleteOrder.mockResolvedValue(mockUsers);

        await orderController.deleteOrderById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(orderService.deleteOrder).toHaveBeenCalledWith({id: req.params.id , connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Order Not Found' });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await orderController.deleteOrderById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});