module.exports = ({
    origin: process.env.CORS_ORIGIN, 
    methods: process.env.CORS_METHODS, 
    allowedHeaders: process.env.CORS_HEADERS, 
    credentials: process.env.CORS_CREDENTIALS 
})