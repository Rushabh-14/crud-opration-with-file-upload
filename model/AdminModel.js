const mongoose = require("mongoose");

const multer = require('multer');

const path = require('path');

const AVATAR_PATH = path.join("/upload/images");

const AdminSchema = mongoose.Schema ({
    book_name : {
        type : String,
        required : true
    },
    book_price : {
        type : Number,
        required : true
    },
    book_pagas : {
        type : Number,
        required : true
    },
    book_author : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        required : true
    }
});

const Userstorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    }
});

AdminSchema.statics.uploadedavatar = multer({storage : Userstorage}).single('avatar');
AdminSchema.statics.uplodedpath = AVATAR_PATH;

const Admin = mongoose.model('Admintbl',AdminSchema);
module.exports = Admin; 