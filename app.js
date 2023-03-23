const express = require('express');
const PORT = 3000;
const ejs = require('ejs');
const db = require('./config/mongoose');
const path = require('path');
const app = express();


//middlewares
app.use(express.urlencoded({extended: true}));

//ROUTES
app.use('/', require('./routes/index'));

//listening app
app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    }

    console.log("server is up on port", PORT);
});