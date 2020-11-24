var mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
var Schema = mongoose.Schema;
mongoose.pluralize(null);


var commentSchema = new Schema({
    author:{
        type:ObjectId,
        required: [true, "Comment author not specified"]
    },
    comment:{
        type:String,
        required:[true, "comment body required"]
    }
}, {
    timestamps:true
});

module.exports = mongoose.model('comment', commentSchema);