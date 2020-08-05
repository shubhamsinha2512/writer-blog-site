var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;


exports.dbCred={
    namesdbURL:'mongodb+srv://shubham:admin@testcluster.4cqpg.mongodb.net/namesdb?retryWrites=true&w=majority',
    user:'shubham',
    pwd:'admin'
}

var URL = this.dbCred.namesdbURL;
var namesdb, userCollection, articleCollection;
var connClient= function (url){
    MongoClient.connect(url, {useNewUrlParser:true, useUnifiedTopology:true}, (err, client)=>{
        console.log("Connected to DB Successully");
        namesdb = client.db('namesdb');
        userCollection = namesdb.collection('users');
        articleCollection = namesdb.collection('articles');
        userCollection.insertOne({"name":"wakdma","desc":"asfdgfs"});
        articleCollection.insertOne({"name":"gMDmillu","desc":"asfdgfs"});
    });
};

connClient(URL);



// exports.dbConn= {
    
//     getClient: function(url){
//             MongoClient.connect(url, {useNewUrlParser:true, useUnifiedTopology:true}, (err, client)=>{
//             namesdb = client.db('namesdb');
//             userCollection = namesdb.collection('users');
//             articleCollection = namesdb.collection('articles');
//             }
//         )},
    
//         getuserCollection:function(){
//             return userCollection;
//         },
//         getarticleCollection:function(){
//             return articleCollection;
//         }
// }
