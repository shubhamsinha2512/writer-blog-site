var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Article = require('../models/article');


exports.submitArticle = (reqBody)=>{
    new Article({
        title : reqBody.title,
        body :  reqBody.articleBody
    }).save();
}

