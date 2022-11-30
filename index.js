//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config()
const ejs = require("ejs");
const lodash = require('lodash');
const mongoose = require('mongoose');

const homeStartingContent = "Hi, Everyone. This is my FullStack Application using nodejs, express, and mongodb. This is the challenge from Dr.Angela's Udemy Course. I have learnt a lot from this course. This course is very helpful for a beginner and this gives a whole overview of the full stack development Journey and for every beginner I recommend this course because its affordable and very helpful at the end. Thankyou ";
const aboutContent = "I am Mohd Abdullah, I love to learn new tech skills 📈.  I am doing my Engineering in Computer Science 💻. I love tea and coffee ☕. I wanted to be a professional web developer 👨🏻‍🏫." ;
const contactContent = "Hi, its Abdullah, You can contact me on email : mohammadabdullah2jan@gmail.com , and on linkedin : @mohd-abdullah-zubair , Thankyou";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect(process.env.BLOG_DB_URL, { useNewUrlParser : true})

const postSchema = new mongoose.Schema({
  title : String,
  post : String
})

const Post = mongoose.model("Post", postSchema)

app.get('/', (req, res)=>{
  Post.find({}, (err,foundPosts)=>{
      res.render('home', {
        pageTitle : false,
        startingContent : homeStartingContent,
        homePosts : foundPosts  // returns array of objects
      })
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
      pageTitle : "About-us",
      about : aboutContent
    })
})
app.get('/contact', (req, res)=>{
    res.render('contact', {
      pageTitle : "Contact-us",
      contact : contactContent
    })
})
app.get('/compose', (req, res)=>{
    res.render('compose', {pageTitle : "compose"})
})
app.post('/compose', (req,res)=>{
  const newPost = new Post({
    title : req.body.postTitle,
    post : req.body.postContent
  })
  newPost.save((err)=> {
    if (!err){
      res.redirect('/');
    }
  })
})


// routings
app.get('/posts/:postId', (req,res)=> {
  const requestedId = req.params.postId
  Post.findOne({_id : requestedId},(err,foundPost)=> {  // foundpPost returns object  
      res.render('post', {
        pageTitle : foundPost.title,
        title : foundPost.title,
        content : foundPost.post
      }) 
  })
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("Server started on port 3000");
});
