const { Router } = require('express');
const bodyParser=require('body-parser');
const express = require('express');
const lrouter = express.Router();
const mongoose = require('mongoose')
const products  = require('../models/project_details')
const path=require('path');
const info_path=path.join(__dirname,'views/HomePage')
const app = express();
app.set("view engine","hbs")
app.set("views",info_path);
app.use(express.static(path.join(__dirname,'./public/')))
lrouter.use(bodyParser.json());

lrouter.route('/')
.get(async(req,res)=>{
    console.log("Heloo-1")
    try {
        const userData  = await products.find();
        res.status(200).render('info',{userData:userData});
        
    } catch (error) {
        res.status(404).send(error);
    }
})

module.exports =  lrouter;