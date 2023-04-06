const path = require('path');
const express = require('express');
const morgan = require('morgan');
const {create} = require('express-handlebars');
const methodOverride = require('method-override');

const app = express();

const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))

//Set up handle bars
const {engine} = require('express-handlebars');
const { hasSubscribers } = require('diagnostics_channel');
app.engine("handlebars", engine(
    create({
        helpers: {
            sum: (a, b) => a + b,
        }
    })
));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'))


// HTTP logger
app.use(morgan('combined'));

// Routes init
route(app);


app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);

