import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import session from 'express-session';
import JobsController from './src/controllers/jobs.controller.js';

const app = express();
const jobsController = new JobsController();

// tell our applicaton to use expree ejs layouts
app.use(expressEjsLayouts);

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

app.get('/jobs', jobsController.getJobs);


export default app;
