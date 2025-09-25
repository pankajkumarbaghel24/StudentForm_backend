const express =require('express');
// const requestIp = require('request-ip');
const Joi =require('joi');
const router=express.Router();
// const mysql=require('../mysql');
const {ObjectId} = require('mongodb');
const {mongoConnect,getDB} = require("../mongodb");



router.get('/',async (req,res)=>{
    let db= getDB();
    let data =await db.collection('todo').find().toArray();
    console.log("Todo Data:-",data)
    return res.send(data);
});

router.get('/:id',async (req,res)=>{
    let id=req.params.id;
    let db= getDB();
    let data =await db.collection('todo').find({_id:new ObjectId(String(id))}).next();
    console.log("get todo Data by id:-",data)
    return res.send(data);
});


router.post('/', (req, res) => {
    const values = { ...req.body };
    let db = getDB();
    db.collection('todo').insertOne(values);
    return res.json({ success: "todo detail inserted successfully." });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const values = req.body;
        let db = getDB();
    db.collection('todo').updateOne({_id:new ObjectId(String(id))},{$set:values});
    return res.json({ success: "To-Do detail updated successfully." });
    
});


router.delete('/:id',(req,res)=>{
    var id = req.params.id;
        let db= getDB();
    let data = db.collection('todo').deleteOne({_id:new ObjectId(String(id))});
    console.log("Delete data:-",data);
    return res.send(data);

});

function validatedevice(device) {
    const schema = Joi.object({
        full_name: Joi.string().max(50).required(),
        mobile_number:Joi.string().pattern(/^[6-9]\d{9}$/).required(),
        email:Joi.string().email({ tlds: { allow: false } }).required(),
        course:Joi.string().required(),
        gender:Joi.string().required(),
    });

    return schema.validate(device);
}

module.exports =router;