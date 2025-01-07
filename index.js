import express from 'express';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import AuthController from './src/controllers/auth.controller.js';
import jobsRoutes from './src/routes/jobs.routes.js';

const app = express();

// Middleware
app.use(expressEjsLayouts);
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse form data

app.use(session({
    secret : "12345",
    resave : false,
    saveUninitialized: true,
    cookie :{secure : false}
}));

// set view engine to render ejs files
app.set('view engine', 'ejs');

// set the views file path from default i.e views to src/views
app.set('views', path.join(path.resolve(), 'src', 'views'));

// default request page
app.get('/', (req, res) => {
    const errorMessage = req.query.errorMessage || null;
    const success = req.query.success || null; // success can be true/false based on your logic
    res.render('landing', { errorMessage, success });
});

// Auth Routes
const authController = new AuthController();

app.post('/register', authController.register); // Register a new recruiter account
app.post('/login', authController.login); // Log in as a recruiter
app.post('/logout', authController.logout); // Log out the currently logged-in recruiter

// Job-related routes
app.use('/jobs', jobsRoutes);

export default app;
