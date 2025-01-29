require('dotenv').config();
const express = require('express');
const {logging, reqLogger, logger} = require('./config/logging');
const dbConnection = require('./models').sequelize;
const cookieParser = require('cookie-parser');
const path = require('path');
const createError = require('http-errors');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

// App config.
app.use(logging);
app.use(reqLogger);
//app.use(cors); // FIXME: habilitar...

// DB.
app.testDB = async () => {
    logger.log('Testing DB connection...');
    try {
        await dbConnection.authenticate();
        logger.log('Connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        throw error;
    }
};

// Request parsers.
app.use(express.json());
app.use(express.urlencoded({extended: false})); // FIXME: quitar..
app.use(cookieParser()); // FIXME: quitar..?

// Routes.
app.use('/', indexRouter);
app.use('/api/v1', apiRouter);

// Public sites.
app.use(express.static(path.join(__dirname, 'public')));
app.use('/portal', express.static(path.join(__dirname, 'public_portal')));

// View engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Angular (portal) catch-all.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public_portal/index.html'));
});


// FIXME: revisar...

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
