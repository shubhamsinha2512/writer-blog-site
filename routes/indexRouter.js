var express = require('express');
var router = express.Router();

var articleOpr = require('../operations/articleOpr');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Article = require('../models/article');
const ejs = require('ejs');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Get on '/'");
  articleOpr.getAllArticles(res)
  .then((articles)=>{
    res.render('index', {allArticles : articles});
  })
});

module.exports = router;