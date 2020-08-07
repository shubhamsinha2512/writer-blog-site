var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Article = require('../models/article');

// app.use(bodyParser.json()); //for application/json
// app.use(bodyParser.urlencoded({extended:true})); //for application/xwww-form-urlencoded

//Internal Functions
function incRead(article) {
    var reads = article.noOfReads+1;
    article.noOfReads=reads;
    article.save();
}

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
        // console(`${req.params.articleId} article retrived`);
        res.setHeader('content-type', 'application/json');
        res.json(article);
        incRead(article);
    }).catch();
}

exports.submitArticle = (req, res)=>{
    console.log(req.body.title);
    console.log(req.body.body);
    new Article({
        title : req.body.title,
        body :  req.body.body,
        noOfReads:0,
        coverPic:''
    }).save().catch();
}

