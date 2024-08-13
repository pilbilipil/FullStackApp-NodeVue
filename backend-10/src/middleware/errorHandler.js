function errorHandler(error, req, res, next) {
    console.log(error.stack);

    res.status(error.status || 500).json({
        error: {
            message: error.message || 'Interlan server error',
            details: error.details || 'An excpedted error ocured'
        }
    });
}

module.exports = errorHandler;