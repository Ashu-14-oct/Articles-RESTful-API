const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/articleApp");

const db = mongoose.connection;

db.once("open", (err)=>{
    if(err){
        console.log(err);
    }

    console.log("connected to the database successfully");
});

module.exports = db;