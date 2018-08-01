const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', ( req, res ) => {
    res.send('Welcome to CentralRouter!');
});

app.listen(process.env.APP_PORT, (err) => {
    if(err) throw err;

    console.log(`${process.env.APP_NAME} started listening on port ${process.env.APP_PORT}!`);
});