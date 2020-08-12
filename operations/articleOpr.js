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

exports.getArticleById = async (req, res)=>{
    var articleObj;
    await Article.findById(req.params.articleId)
    .then((article)=>{
        console.log(article);
        articleObj = article;
    }).catch(()=>{res.send("Something went wrong!")})
    console.log("this obj:" + articleObj);
    return articleObj;
    // .then((article)=>{
    //     // console(`${req.params.articleId} article retrived`);
    //     incRead(article);
    //     console.log(article);
    //     return article;
    // }).catch();
}

exports.submitArticle = (req, res)=>{
    new Article({
        title : req.body.title,
        body :  req.body.articlebody,
        author: req.body.author,
        noOfReads:0,
        coverPic:''
    }).save();
    
    res.render('article', {
        articletitle : req.body.title,
        articlebody : req.body.articlebody,
        articleAuthor : req.body.author,
        timeDate:'None',
        reads : 0
    })
}