var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;


exports.dbCred={
    namesdbURL:'mongodb+srv://shubham:admin@testcluster.4cqpg.mongodb.net/namesdb?retryWrites=true&w=majority',
    user:'shubham',
    pwd:'admin'
}

var URL = this.dbCred.namesdbURL;
var namesdb=null, userCollection=null;
function connClient(url){
    MongoClient.connect(url, {useNewUrlParser:true, useUnifiedTopology:true}, (err, client)=>{
        console.log("Connected to DB Successully");
        namesdb = client.db('namesdb');
        userCollection = namesdb.collection('users');
        userCollection.insertOne({"name":"billu","desc":"asfdgfs"});

    });
}

connClient(URL);
exports.namesdb;
exports.userCollection;