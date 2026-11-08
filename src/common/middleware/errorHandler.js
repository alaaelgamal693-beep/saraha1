export const errorHandler = (err, req, res, next) => {
    res.status(err.cause || 500).json({
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV == "production" ? {} : {stack: err.stack})
    })
}