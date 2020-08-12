var express = require('express');
var articleRouter = express.Router();
var articleOpr = require('../operations/articleOpr');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Article = require('../models/article');
const ejs = require('ejs');

articleRouter.use(bodyParser.json());
articleRouter.use(bodyParser.urlencoded({extended:true}));
console.log("before get - articleRouter");

articleRouter.route('/')
.get((req, res, next)=>{
    console.log("Get Request on /article");
    res.statusCode=200;
    res.setHeader('content-type', 'application/json');
    articleOpr.getAllArticles(res);
    // res.end(articleOpr.getAllArticles());
})
.post((req, res, next)=>{
    console.log('POST not supported on /article');
    res.end('POST not supported on /article');
})
.put((req, res, next)=>{
    console.log('PUT not supported on /article');
    res.end('PUT not supported on /article');
})
.delete((req, res, next)=>{
    console.log('DELETE not supported on /article');
    res.end('PUT not supported on /article');
});


//Article Submission
articleRouter.route('/compose')
.get((req, res, next)=>{
    res.sendStatus=200;
    res.render('compose');
})
.put((req, res, next)=>{
    console.log('PUT/UPDATION to be added on /article/submit');
    res.end('PUT/UPDATION to be added on /article/submit');
})
.post((req, res, next)=>{
    console.log('POST on /article/submit');
    articleOpr.submitArticle(req, res);
    res.statusCode=200;
    res.end("Article Submitted Successfully");
})
.delete((req, res, next)=>{
    console.log('DELETE to be added on article/submit');
    res.end('DELETE to be added on article/submit');
})

// articleRouter.route('/delete')


articleRouter.route('/:articleId')
.get((req, res, next)=>{
    Article.findById(req.params.articleId)
    .then((article)=>{
        res.render('article', {
            articletitle : article.title,
            articlebody : article.body,
            articleAuthor : article.author,
            timeDate : article.updatedAt,
            reads : noOfReads
        });
    })
    
})
.delete((req, res, next)=>{
    Article.findOneAndDelete({'_id':req.params.articleId})
    .then((article)=>{
        res.write(article);
        res.end("Deleted Succesfully");
    })
    
})





// articleRouter.route('/compose')
// .get((req, res, next)=>{
//     res.sendStatus=200;
//     res.render('compose');
// })
// .post((req,res,next)=>{
//     articleOpr.submitArticle(req, res);
//     res.setHeader('content-type', 'application/json');
//     res.json(req.body);
// })


module.exports=articleRouter;