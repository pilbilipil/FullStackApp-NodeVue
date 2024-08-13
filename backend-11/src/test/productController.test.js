const oracledb = require('oracledb');
const productController = require('../controller/productControler');
const productService = require('../service/productService');

jest.mock('oracledb', () => ({
    getConnection: jest.fn(),
}));
jest.mock('../service/productService');

describe('productController.getAllProduct', () => {
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
        productService.getAllProduct.mockResolvedValue(mockUsers);

        await productController.getProduct(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(productService.getAllProduct).toHaveBeenCalledWith({ connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Product found successfully', result: result.rows });

    });

    test('should return 404 - Service not found', async () => {
        const mockUsers = { rows: [] };
        productService.getAllProduct.mockResolvedValue(mockUsers);

        await productController.getProduct(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(productService.getAllProduct).toHaveBeenCalledWith({ connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await productController.getProduct(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('productController.createProduct', () => {
    let req, res, next, connection;

    beforeEach(() => {
        req = {
            body: {
                price: 3100,
                count: 531,
                weight: 100,
                country: 'USA',
                name: 'aromatization',
                type: 'salon'
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

    test('should return 200 - product created successfully', async () => {
        const mockUsers = { rowsAffected: 1 };
        productService.createNewProduct.mockResolvedValue(mockUsers);

        await productController.createProduct(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(productService.createNewProduct).toHaveBeenCalledWith({ body: req.body, connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Product created successfully' });

    });

    test('should return 400 -  Cant create product', async () => {
        const mockUsers = { rowsAffected: 0 };
        productService.createNewProduct.mockResolvedValue(mockUsers);

        await productController.createProduct(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(productService.createNewProduct).toHaveBeenCalledWith({ body: req.body, connection });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Cant create product' });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await productController.createProduct(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('productController.getProductById', () => {
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

    test('should return 200 - product found successfully', async () => {
        const mockUsers = { rows: [{ id: 1, name: 'spark' }] };
        const result = { rows: [{ id: 1, name: 'spark' }] };
        productService.getProductById.mockResolvedValue(mockUsers);

        await productController.getProductById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(productService.getProductById).toHaveBeenCalledWith({ id: req.params.id, connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Product found successfully', result: result.rows });
    });

    test('should return 404 - poroduct not found', async () => {
        const mockUsers = { rows: [] };
        productService.getProductById.mockResolvedValue(mockUsers);

        await productController.getProductById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(productService.getProductById).toHaveBeenCalledWith({ id: req.params.id, connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await productController.getProductById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('productController.deleteProductById', () => {
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

    test('should return 200 - product deleted successfully', async () => {
        const mockUsers = { rowsAffected: 1 };
        productService.deleteProduct.mockResolvedValue(mockUsers);

        await productController.deleteProductById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(productService.deleteProduct).toHaveBeenCalledWith({ id: req.params.id, connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Product deleted successfully' });
    });

    test('should return 404 - poroduct not found', async () => {
        const mockUsers = { rowsAffected: 0 };
        productService.deleteProduct.mockResolvedValue(mockUsers);

        await productController.deleteProductById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(productService.deleteProduct).toHaveBeenCalledWith({ id: req.params.id, connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Product Not Found' });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await productController.deleteProductById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('productController.deleteProductById', () => {
    let req, res, next, connection;

    beforeEach(() => {
        req = {
            params: {
                id: 1
            },
            body: {
                price: 3400,
                productCount: 432,
                weight: 65,
                productCountry: 'German',
                productName: 'Air-filter',
                productType: 'salon'
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

    test('should return 200 - updated product successfully', async () => {
        const mockUsers = { rowsAffected: 1 };
        productService.updateProductById.mockResolvedValue(mockUsers);

        await productController.updateProduct(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(productService.updateProductById).toHaveBeenCalledWith({ id: req.params.id, body: req.body, connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Product updated successfully' });
    });

    test('should return 404 - poroduct not found', async () => {
        const mockUsers = { rowsAffected: 0 };
        productService.updateProductById.mockResolvedValue(mockUsers);

        await productController.updateProduct(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(productService.updateProductById).toHaveBeenCalledWith({ id: req.params.id, body: req.body, connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Product Not Found' });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await productController.updateProduct(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});


