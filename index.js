const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const helmet = require('helmet');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const port = 5000;

app.use(helmet());

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// cookie parser middleware
app.use(cookieParser());

//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

// a variable to save a session
let session;

app.get('/',(req,res) => {
  session=req.session;
  if(session.userid){
      res.send("Welcome User <a href=\'/logout'>click to logout</a>");
  }else
  res.sendFile('views/index.html',{root:__dirname})
});

app.post('/user',(req,res) => {
  if(req.body.username == myusername && req.body.password == mypassword){
      session=req.session;
      session.userid=req.body.username;
      console.log(req.session)
      res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
  }
  else{
      res.send('Invalid username or password');
  }
});

app.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
