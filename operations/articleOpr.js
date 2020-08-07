var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Article = require('../models/article');
const article = require('../models/article');




//Export Functions

exports.getAllArticles = (res)=>{
    Article.find({})
    .then((articles)=>{
        console.log('articles retrived successful');
        res.json(articles);
    })
    .catch();
}

exports.getArticleById = (req, res)=>{
    Article.findById(req.params.articleId)
    .then((article)=>{
        console(`${req.params.articleId} article retrived`);
        res.setHeader('content-type', 'application/json');
        res.json(article);
    }).catch();
}

exports.submitArticle = (reqBody)=>{
    new Article({
        title : reqBody.title,
        body :  reqBody.body,
        noOfReads:0,
        coverPic:''
    }).save().catch();
}

