const mongodb = require('mongodb');
require("dotenv").config();
const MongoClient = mongodb.MongoClient;


// const url = `mongodb+srv://root:root@uniconnectnms.fadvayz.mongodb.net/?retryWrites=true&w=majority&appName=UniConnectNMS`;
const url = process.env.MongoURL;

let _db;
const mongoConnect = (callback)=>{
    MongoClient.connect(url)
    .then((client)=>{

        callback();
        _db = client.db('skilltest');
    })
    .catch((error)=>{
        console.log("MongoDB Connection Error:-",error)
    });
};

const getDB = () =>{
    if(!_db){
        throw new Error('Mongo not connected');
    }
    return _db;
}

exports.mongoConnect=mongoConnect;
exports.getDB=getDB;