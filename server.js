const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//Congif Files
const dbConfig = require('./configurations/dbConfig');
const serverConfig = require('./configurations/serverConfig');
var port = serverConfig.port;
var domain = serverConfig.domain;

// //Schemas
var User = require('./models/user');
var Article = require('./models/article');

//Routing
var indexRouter = require('./routes/indexRouter');
var homeRouter = require('./routes/homeRouter');
var userRouter = require('./routes/userRouter');
var loginRouter = require('./routes/loginRouter');
var signupRouter = require('./routes/signupRouter');
var articleRouter = require('./routes/articleRouter');
var aboutRouter = require('./routes/aboutRouter');
var profileRouter = require('./routes/profileRouter');


const app=express();

//set view-engine to ejs
app.set('view engine', 'ejs');

//DB Connection Initialization
mongoose.connect(dbConfig.namesdbURL, {useNewUrlParser:true, useUnifiedTopology:true});

app.use(morgan('dev'));
app.use(bodyParser.json()); //for application/json
app.use(bodyParser.urlencoded({extended:true})); //for application/xwww-form-urlencoded
app.use(express.static(__dirname+'/public'));
console.log(__dirname);

//localhost:3000/public
// app.get('/',(req, res, next)=>{
//     res.statusCode=200;
//     res.setHeader("Content-Type", 'text/html');
//     res.end("<html>Baby</html>");
// });

//Using routers
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/about', aboutRouter);
app.use('/article', articleRouter);
app.use('/profile', profileRouter);

http.createServer(app).listen(port, domain, ()=>{
    console.log(`Server started at port ${port}`);
})