const express=require('express');
const Joi=require('joi');
const config= require('config');
const cors =require('cors');
const path = require('path');
const studentDetails=require('./router/detail');
const {mongoConnect,getDB} =require('./mongodb');



const app = express();


app.use(express.json());
app.use(cors());


app.use('/student',studentDetails);

const port=5000;

mongoConnect(client =>{
     console.log("connect to MongoDB");
    app.listen(port,()=>{
    console.log(`listeing on port ${port}`)
    
});
});
