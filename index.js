const express = require("express");

const path = require("path");

const port = 9999;

const app = express();

const fs = require("fs");

const mongoose = require('./config/mongoose');

const Admintbl = require('./model/AdminModel');

app.use('/upload',express.static(path.join("upload")));

app.use(express.urlencoded());

app.set('view engine' , 'ejs');

app.get('/', (req,res)=>{
    return res.render('index');
});

app.post('/insertdata',(req,res)=>{
    Admintbl.uploadedavatar(req,res,(err)=>{
        if(err){
            console.log("file not upload");
            return false;
        }
        let avatar =""; 

        console.log(req.file);
        if(req.file){
            avatar = Admintbl.uplodedpath+"/"+req.file.filename;
        }

        Admintbl.create({
            book_name : req.body.book_name,
            book_price : req.body.book_price,
            book_pagas : req.body.book_pages,
            book_author : req.body.book_author,
            avatar : avatar
        },(err,Admindata)=>{
            if(err){
                console.log("record not inserted");
                return false;
            }
            console.log("record inserted successfuly");
            return res.redirect('back');
        });
    });
});

app.get('/viewData',(req,res)=>{
    Admintbl.find({},(err,data)=>{
        if(err) throw "record not found";
        return res.render('viewdata',{
            recorddata : data
        });
    });
}); 

app.get('/deletedata/:id',(req,res)=>{
    let id = req.params.id;

    Admintbl.findById(id,(err,ddata)=>{
        if(err){
            console.log("file not delete in folder");
            return false;
        }

        if(ddata.avatar){
            fs.unlinkSync(path.join(__dirname,ddata.avatar));
        }
        Admintbl.findByIdAndDelete(id,(err,data)=>{
            if(err) throw "a one err pls check";
        });
        console.log("record successfuly deleted");
        return res.redirect("back");
    });
});

app.get('/editData/:id',(req,res)=>{
    let id = req.params.id;
    Admintbl.findById(id,(err,singleData)=>{
        if(err)
        {
            console.log("Data not found!");
            return false;
        }
        return res.render('edit',{
            single : singleData
        });
    });
});

app.post('/updatedata',(req,res)=>{
    Admintbl.uploadedAvatar(req,res,(err)=>{
        if(err){
            console.log("file not update");
            return false;
        }
        let id = req.body.edit_id;
        if(req.file){
            Admintbl.findById(id,(err,edata)=>{
                if(err){
                    console.log("image not found");
                    return false;
                }
                if(edata.avatar){
                    fs.unlinkSync(path.join(__dirname,edata.avatar));
                }
                let avatar = Admintbl.uplodedpath+"/"+req.file.filename;
                Admintbl.findByIdAndUpdate(id,{
                    book_name : req.body.book_name,
                    book_price : req.body.book_price,
                    book_pagas : req.body.book_pages,
                    book_author : req.body.book_author,
                    avatar : avatar
                },(err,editData)=>{
                    if(err){
                        console.log("record not update");
                        return false;
                    }
                    console.log("record update seccessfuly");
                    return res.redirect('/viewData');
                });
            });
        }
        else{
            Admintbl.findById(id,(err,updata)=>{
                if(err){
                    console.log("id not found");
                    return false;
                }
                
                let avatar = updata.avatar;
                Admintbl.findByIdAndUpdate(id,{
                    book_name : req.body.book_name,
                    book_price : req.body.book_price,
                    book_pagas : req.body.book_pages,
                    book_author : req.body.book_author,
                    avatar : avatar
                },(err,editData)=>{
                    if(err){
                        console.log("record not update");
                        return false;
                    }
                    console.log("record update seccessfuly");
                    return res.redirect('/viewData');
                });
            });
        }
    });
});

app.listen(port,(err)=>{
    if(err) throw "server not start";
    console.log("server start on port"+port);
});