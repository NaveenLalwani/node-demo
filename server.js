const express = require("express");
const app = express();

app.use(express.json());

var dotenv = require('dotenv');
dotenv.config({
    path: '.env'
});

var db = require('./app/models');

const routes = require('./app/routes/index')(app);

db.sequelize.sync().then((req) => {
    app.listen( process.env.PORT, () => {
        console.log(` Backend server connected : ${process.env.PORT} `);
    });
});