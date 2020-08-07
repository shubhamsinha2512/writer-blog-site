// //Module Dependencies
// var http = require('http');
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var mongodb = require('mongodb');
// var MongoClient = require('mongodb').MongoClient;
// var mongoose = require('mongoose');
// var bodyParser = require('body-parser');
// var articleOpr = require('./operations/articleOpr');

// // //configurations
// var serverConfig = require('./configurations/serverConfig');
// var dbConfig = require('./configurations/dbConfig');

// // //Connection Initialization to DB
// mongoose.connect(dbConfig.namesdbURL, {useNewUrlParser:true, useUnifiedTopology:true});

// // //Schemas
// var User = require('./models/user');
// var Article = require('./models/article');

// //Routing
// var indexRouter = require('./routes/index');
// var homeRouter = require('./routes/homeRouter');
// var userRouter = require('./routes/userRouter');
// var loginRouter = require('./routes/loginRouter');
// var signupRouter = require('./routes/signupRouter');
// var articleRouter = require('./routes/articleRouter');
// var aboutRouter = require('./routes/aboutRouter');
// var bodyParser = require('body-parser');

// var app = express();

// app.use(bodyParser.json());


// // // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.json());


// //Using routers
// app.use('/', indexRouter);
// app.use('/users', userRouter);
// app.use('/home', homeRouter);
// app.use('/users/login', loginRouter);
// app.use('/users/signup', signupRouter);
// app.use('/about', aboutRouter);
// // app.use('/article', articleRouter);

// // dbConfig.connClient(dbConfig,dbConfig.dbCred.namesdbURL);
// // // dbConfig.dbConn.getuserCollection.insertOne({"name":"bhalu","desc":"asfdgfs"});
// // // dbConfig.namesdb.userCollection.insertOne({"name":"bhalu","desc":"asfdgfs"});

// // var u1 = new User(
// //   {
// //     name:'Shubham',
// //     email:'shubham@getMaxListeners.com',
// //     password:'abcdef'
// //   }
// // );
// // u1.save();

// // new Article({
// //     title:'This Article',
// //     body:'This Article Body',
// //     noOfReads:34
// // }).save();

// // Article.find((err, articles)=>{
// //   if (err) console.log(err);
// //   else console.log(articles);
// // });

// // mongoose.connection.close();

// // // catch 404 and forward to err-or handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

// //   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

// // http.createServer(app).listen(3000, 'localhost', ()=>{
// //   console.log("Started on port 3000");
// // })
