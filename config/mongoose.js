const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/crud');

const db = mongoose.connection;

db.on('err',console.error.bind(console,'DB is not connected'));

db.once('open',(err)=>{
    if(err){
        console.log("DB is not start");
    }
    console.log("DB is start successfuly");
});

module.exports = db;