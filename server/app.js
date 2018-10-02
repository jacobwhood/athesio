const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');``
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const _ = require('lodash');

const GITHUB_CLIENT_ID = `411028a3a75a80bbc473`;
const GITHUB_CLIENT_SECRET = `d2b40c5a59d167ad32130acdbc85f60518416449`;


passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(user, done){
  done(null, user);
});

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
  }, 
  function(accessToken, refreshToken, profile, done){
  return done(null, profile);
  }
))

const app = express();




app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret: 'top secret key', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));


let isAuthenticated = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};

console.log(__dirname);
app.get('/', isAuthenticated, function(req, res){
  console.log(JSON.parse(req.session.passport.user._raw).login)
  app.use(express.static(__dirname + '/../client/dist'));
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/login', function(req, res){
    res.send('Hello from lambda')
//   res.sendFile(path.join(__dirname, '../client/dist/login.html'));
});

app.get('/logout', function(req, res){
  req.logout();
//   res.sendFile(path.join(__dirname, '../client/dist/login.html'));
});


app.get('/auth/github', 
  passport.authenticate('github', {scope: ['user:email']}),
  function(req, res){
    console.log(res);
  }
);

app.get('/auth/github/callback', 
  passport.authenticate('github', {failureRedirect: '/login'}),
  function(req, res){
    res.redirect('/');
  }
);

module.exports = app; 
