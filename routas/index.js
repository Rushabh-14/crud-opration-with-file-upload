const express = require("express");

const router = express.Router();

const mongoose = require('../config/mongoose');

const Admintbl = require('../model/AdminModel');

router.use(express.urlencoded());


module.exports = router;