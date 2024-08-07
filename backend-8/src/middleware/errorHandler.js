function errorHandler(err, req, res, next) {
    console.log(error.stack);

    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Interlan server error',
            details: err.details || 'An excpedted error ocured'
        }
    });
}

module.exports = errorHandler;