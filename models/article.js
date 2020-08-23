var mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
var Schema = mongoose.Schema;
mongoose.pluralize(null);

var articleSchema=new Schema({
    title:{
        type:String,
        required:[true, "Article Title Not Specified"]
    },
    body:{
        type:String,
        required:[true, "Article Body Not Specified"]
    },
    author:{
        type:ObjectId,
        required:[false, "Author not specified"]
    },
    noOfReads:{
        type:Number,
        required:false
    },
    coverPic:{
        type:String
    }
}, {
    timestamps:true
});

module.exports = mongoose.model('articles', articleSchema);