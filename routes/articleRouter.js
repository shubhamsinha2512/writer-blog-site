var express = require('express');
var articleRouter = express.Router();
var articleOpr = require('../operations/articleOpr');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Article = require('../models/article');

articleRouter.use(bodyParser.json());
console.log("before get - articleRouter");

articleRouter.route('/')
// .all((req, res, next)=>{
//     console.log("All routing");
//     res.end();
// })
.get((req, res, next)=>{
    console.log("Get Request on /article");
    Article.find({})
    .then((articles)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(articles);
        console.log('articles retrived successful');
        res.end();
    })
    .catch((err) => next(err));
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


articleRouter.route('/submit')
.get((req, res, next)=>{
    console.log('GET not supported on /article/submit');
    res.end();
})
.put((req, res, next)=>{
    console.log('PUT?IPDATION to be added on /article/submit');
    res.end();
})
.post((req, res, next)=>{
    articleOpr.submitArticle(req.body);
    res.end();
})
.delete((req, res, next)=>{
    console.log('DELETE to be added on article/submit');
    res.end();
})

module.exports=articleRouter;