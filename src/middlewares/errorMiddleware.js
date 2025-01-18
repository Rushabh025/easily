import { checkAuth } from "./auth.middleware.js";

// Error-handling middleware
const errorMiddleware = (err, req, res, next) => {

    checkAuth(req, res, () =>{
        // Set the status code or default to 500
        const statusCode = err.status || 500;

        // Render the error page with auth and error details
        res.status(statusCode).render('error', {
            status: statusCode,
            message: err.message || 'Internal Server Error',
            isLoggedIn: req.isLoggedIn || false, // From checkAuth
            user: req.user || null, // From checkAuth
        });

    });
};

export default errorMiddleware;  