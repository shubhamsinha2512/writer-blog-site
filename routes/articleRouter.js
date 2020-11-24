var express = require('express');
var articleRouter = express.Router();
var articleOpr = require('../operations/articleOpr');
var userOpr = require('../operations/userOpr');
const authenticate = require('../operations/authenticate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Article = require('../models/article');
const ejs = require('ejs');
const serverConfig = require('../configurations/serverConfig');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({storage: storage});


articleRouter.use(cookieParser(serverConfig.cookieSecret));
articleRouter.use(bodyParser.json());
articleRouter.use(bodyParser.urlencoded({extended:true}));
console.log("before get - articleRouter");

articleRouter.route('/')
.get((req, res, next)=>{
    console.log("Get Request on /article");
    res.statusCode=200;
    res.setHeader('content-type', 'application/json');
    articleOpr.getAllArticles();
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
    
    if(req.signedCookies.user){
        userOpr.getUserByEmail(req.signedCookies.user)
        .then((user)=>{
            res.sendStatus=200;
            res.render('compose', {
                user: {
                    userdetails: user
                }
            });
        })
        
    }
    else{
        res.statusCode=401;
        res.render('login', {user:null, message:""});
    }

})
.put((req, res, next)=>{
    console.log('PUT/UPDATION to be added on /article/submit');
    res.end('PUT/UPDATION to be added on /article/submit');
})
.post(upload.single('blogimage'), (req, res, next)=>{
    console.log('POST on /article/submit');
    // console.log(req.file);
    articleOpr.submitArticle(req, res);
    // res.statusCode=200;
    // res.end("Article Submitted Successfully");
})
.delete((req, res, next)=>{
    console.log('DELETE to be added on article/submit');
    res.end('DELETE to be added on article/submit');
})

// articleRouter.route('/delete')


articleRouter.route('/:articleId')
.get((req, res, next)=>{

    articleOpr.getArticleById(req.params.articleId)
    .then((article)=>{
        articleOpr.incRead(article);
        var allArticles;
        if(req.signedCookies.user){
            var author = "";
            //var allArticles="hello";
            
            //console.log(allArticles);
            userOpr.getAuthorDetails(article.author).then((value)=>{
                author=value.name;
            })
            //console.log(req.signedCookies);
            //articleOpr.addComment(req.signedCookies.user, article._id, "another test comment");
            userOpr.setLastRead(req.signedCookies.user, article._id);
            userOpr.getUserByEmail(req.signedCookies.user)
            .then((user)=>{
                
                articleOpr.getAllArticles().then((articles)=>{
                    //console.log(articles);
                    allArticles=articles;

                    console.log(allArticles);
                    var userObj = {
                        user: {userdetails:user},
                        article: article,
                        author : author,
                        allArticles:allArticles
                    }
                    res.render('article', userObj);
                })
            })
        }
        else{
            articleOpr.getAllArticles().then((articles)=>{
                allArticles=articles;
                var userObj = {
                    user: null,
                    article: article,
                    allArticles:allArticles
                }
            res.render('article', userObj);
        });
    }
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

articleRouter.route('/article/compose')
.get((res, req, next)=>{
    req.redirect('/compose');
})

articleRouter.route('/comment')
.get((req, res)=>{

})
.post((req,res)=>{
    articleOpr.addComment(req.signedCookies.user, req.body.article_id, req.body.comment);
    res.redirect(req.body.article_id);
})


module.exports=articleRouter;