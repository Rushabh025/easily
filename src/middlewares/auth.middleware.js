export function checkAuth(req, res, next) {
    if (req.session.user) {
        // If the user is logged in, proceed to the next middleware or route
        res.locals.isLoggedIn = true;
        res.locals.user = req.session.user;
    } else {
        // If not logged in, set locals to reflect that and continue
        res.locals.isLoggedIn = false;
        res.locals.user = null;
    }
    next(); // Call next to pass control to the next middleware or route handler
}