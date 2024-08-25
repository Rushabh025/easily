import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';

const app = express();

// tell our applicaton to use expree ejs layouts
app.use(expressEjsLayouts);

// set view engine to render ejs files
app.set('view engine', 'ejs');

// set the views file path from default i.e views to src/views
app.set('views', path.join(path.resolve(), 'src', 'views'));

// default request page
app.get('/',(req, res) => {
    res.render('landing',{ title: 'Home Page' });
});

export default app;
