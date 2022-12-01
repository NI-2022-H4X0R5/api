require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// Init database
require('./database/sequelize')

const app = express();

// Init commons middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());

// Init routes
require('./handlers/routeHandler')(app);
// Init 404 middleware
app.use(({res}) => res.status(404).json({message: "Unknown route"}));

// Start the API
app.listen(process.env.PORT, process.env.BIND_ADDRESS, () => {
    console.log(`Server started on http://${process.env.BIND_ADDRESS}:${process.env.PORT}`);
});

// Export app for tests
module.exports = app;
