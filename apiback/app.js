require('dotenv').config();
const express = require('express');
const {logging, reqLogger, logger} = require('./config/logging');
const dbConnection = require('./models').sequelize;
const cookieParser = require('cookie-parser');
const path = require('path');
const corsConfig = require('./config/cors');
const {jwtSessionStorageInit} = require("./config/jwt");
const errorHandler = require("./middlewares/error-handler");
const catchAllNotFound = require("./middlewares/catch-all-not-found");
const {assignRequestId} = require("./middlewares/assign-request-id");

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

// App config.
app.use(assignRequestId);
app.use(logging);
app.use(reqLogger);
app.use(corsConfig);
app.use(cookieParser());
jwtSessionStorageInit();

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

// Error handling.
app.use(errorHandler);

// Catch-all other routes.
app.use(catchAllNotFound);

module.exports = app;
