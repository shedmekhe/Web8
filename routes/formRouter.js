const express =require('express');
const bodyParser=require('body-parser');
const upload = require('express-fileupload');
const axios = require('axios').default
const formRouter=express.Router();
const Projects=require('../models/project_details');
const path=require('path');

const home_path=path.join(__dirname,'views/HomePage')
const app=express();

formRouter.use(bodyParser.json());
formRouter.use(bodyParser.urlencoded({ extended: true }));
formRouter.use(upload());
app.use(express.static(path.join(__dirname,'./public/')))
app.set("view engine","hbs")
app.set("views",home_path);

// const  multer=require('multer');

// const storage=multer.diskStorage({
//     destination:async(req,file,cb)=>{
//         cb(null,'./public/fromReg/')
//         // console.log(file)

//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname)
//     }
// });

// const imageFileFilter=(req,file,cb)=>{
//     if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
//         return cb(new Error('You can upload only image files!'), false);
//     }
//     cb(null,true);
// }

// const upload1 = multer({ storage: storage,
//     limits:{
//         fileSize:1024*1024*5
//     },
//     fileFilter: imageFileFilter}).fields('myfile1','myfile');

formRouter.route('/')
.get((req,res,next)=>{
    res.render("form");
})
.post(async(req,res)=>{
    try{
        // console.log(req);
        
        // const contents1 = new Buffer.from(req.files.myFile.data).toString('base64');
        const contents2 = new Buffer.from(req.files.myfile1.data).toString('base64');
        var postData2 = {
            name: req.files.myfile1.name,
            mimitype: req.files.myfile1.mimetype,
            img: contents2
        };
        fileresp2 = await axios.post(encodeURI("https://script.google.com/macros/s/AKfycbw2IE6Njj-V3Mg3e9S2tRKZw127XuUf0-8tf2cuEAfUbzm4iA7HBMR_xqVNPByYCgi0/exec"), postData2)
        var s = fileresp2.data.link;
        req.body.myfile1 = "https://drive.google.com/uc?export=view&id=" +  s.split("?")[1].split("&")[0].split("=")[1];
    
    // if(req.files.myfile)
    // {
    //     const contents3 = new Buffer.from(req.files.myfile.data).toString('base64');
    // // var postData1 = {
    // //     name: req.files.myFile1.name,
    // //     mimitype: req.files.myFile1.mimetype,
    // //     img: contents1
    // // };
    // var postData3 = {
    //     name: req.files.myfile.name,
    //     mimitype: req.files.myfile.mimetype,
    //     img: contents3
    // };
    
    // }
    // if(req.files.vid_1)
    // {
    //     const contents4 = new Buffer.from(req.files.vid_1.data).toString('base64');
    // // var postData1 = {
    // //     name: req.files.myFile1.name,
    // //     mimitype: req.files.myFile1.mimetype,
    // //     img: contents1
    // // };
    // var postData4 = {
    //     name: req.files.vid_1.name,
    //     mimitype: req.files.vid_1.mimetype,
    //     img: contents4
    // };
    // }

    

    await axios.post(encodeURI("https://script.google.com/macros/s/AKfycbw2IE6Njj-V3Mg3e9S2tRKZw127XuUf0-8tf2cuEAfUbzm4iA7HBMR_xqVNPByYCgi0/exec"), postData2).then(async(fileresp2) => {
        // console.log(fileresp2.data.link)
        var s = fileresp2.data.link;
        req.body.myfile1 = "https://drive.google.com/uc?export=view&id=" +  s.split("?")[1].split("&")[0].split("=")[1];
        await Projects.create(
            req.body
         )   
         console.log("Projects Created !!");
         res.statusCode=200;
         // res.setHeader('Content-Type','application/json')
         res.redirect("/");
    }).catch((err)=>{
        console.log(err);
    })
       
    }
    catch (e){
        res.status(400).send(e)
        console.log(e);
     }
});

module.exports=formRouter;
// {   
//     title:req.body.title,
//     obj:req.body.obj,
//     myfile:req.body.myfile,
//     myfile1:req.myfile1.filename,
//     yname:req.body.yname,
//     email:req.body.email,
//     socialink:req.body.socialink,
//     socialink1:req.body.socialink1,
//     gname:req.body.gname,
//     technologies:req.body.technologies,
//     apk_views:req.body.apk_views,
//     vid1:req.body.vid1,
//     repolink:req.body.repolink,
//     weblink:req.body.weblink,
//     apkf:req.body.apkfs,
//     }