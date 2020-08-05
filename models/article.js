var mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
var Schema = mongoose.Schema;

var Article=new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    noOfReads:{
        type:Number
    },
    coverPic:{
        type:String
    }
}, {
    timestamps:true
})