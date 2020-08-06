var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;


var dbName='namesdb';
var user='shubham';
var password='admin';

exports.namesdbURL=`mongodb+srv://shubham:admin@testcluster.4cqpg.mongodb.net/namesdb?retryWrites=true&w=majority`;


var URL = this.dbCred.namesdbURL;
// var namesdb, userCollection, articleCollection;
// var connClient= function (url){
//     MongoClient.connect(url, {useNewUrlParser:true, useUnifiedTopology:true}, (err, client)=>{
//         console.log("Connected to DB Successully");
//         namesdb = client.db('namesdb');
//         userCollection = namesdb.collection('users');
//         articleCollection = namesdb.collection('articles');
//         userCollection.insertOne({"name":"wakdma","desc":"asfdgfs"});
//         articleCollection.insertOne({"name":"gMDmillu","desc":"asfdgfs"});
//     });
// };

// connClient(URL);

exports.client = new MongoClient(this.dbCred.namesdbURL, {useNewUrlParser:true, useUnifiedTopology:true});