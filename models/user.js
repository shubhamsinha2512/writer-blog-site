var mongoose = require('mongoose');
const { ObjectId, Timestamp } = require('mongodb');
var Schema = mongoose.Schema;
mongoose.pluralize(null);

var favSchema = new Schema({
    articleId:{
        type:ObjectId,
        required:[true, "No articleId specified"]
    }
},  {
        timestamps:true
});

var userSchema = new Schema({
    name: {
        type:String,
        required:[true, "No Name Specified"]
    },
    email:{
        type:String,
        required:[true, "No Email Specified"]
    },
    password:{
        type:String,
        required:[true, "No Password Specified"]
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
        required:false
    },
    lastread:{
        type:ObjectId,
        required:false
    }
},  {
        timestamps:true
});

module.exports = mongoose.model("users", userSchema);