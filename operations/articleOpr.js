var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Article = require('../models/article');

const User = require('../models/user');
const userOpr = require('../operations/userOpr');

// app.use(bodyParser.json()); //for application/json
// app.use(bodyParser.urlencoded({extended:true})); //for application/xwww-form-urlencoded

//Internal Functions
exports.incRead = function (article) {
    var reads = article.noOfReads+1;
    article.noOfReads=reads;
    article.save();
}

//Export Functions

exports.getAllArticles = ()=>{
    return Article.find({});

}

exports.getArticleById = (articleId)=>{
    return Article.findById(articleId);
    // .then((article)=>{
    //     // console(`${req.params.articleId} article retrived`);
    //     incRead(article);
    //     console.log(article);
    //     return article;
    // }).catch();
}

exports.submitArticle = (req, res)=>{
    console.log(req.signedCookies.user);
    userOpr.getUserByEmail(req.signedCookies.user)
    .then((user)=>{
        // console.log(user);
        new Article({
            title : req.body.title,
            body :  req.body.articlebody,
            author: user._id,
            noOfReads:0,
            coverPic:''
        }).save();
        
        res.render('article', {
            user:{userdetails:user},
            article: {
            title : req.body.title,
            body : req.body.articlebody,
            author : user.name,
            timeDate:'None',
            reads : 0
            }
        })
    })
}

exports.getUserArticles = (userId)=>{
    return Article.find({author:userId});
}