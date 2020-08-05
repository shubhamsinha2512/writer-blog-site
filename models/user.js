var mongoose = require('mongoose');
const { ObjectId, Timestamp } = require('mongodb');
var Schema = mongoose.Schema;


var favSchema = new Schema({
    articleId:{
        type:ObjectId,
        required:false
    }
},  {
        timestamps:true
});

var User = new Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    },
    favourites:[favSchema],
    
    profilepicURL:{
        type:String
    },
    description:{
        type:String,
    },
    lastread:{
        type:ObjectId
    }
},  {
        timestamps:true
});