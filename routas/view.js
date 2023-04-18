const express = require("express");

const router = express.Router();

console.log("werking");

router.get('/*',(req,res)=>{
    return res.render('index');
});

module.exports = router;