// Load environment variables into process.env
require('dotenv').config();

// Import express.
const express = require('express');

// Import body parser middleware.
const bodyParser = require('body-parser');

// Import mongoose to connect to our MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_HOST).then(() => {
  console.log('Connected to database!')
}).catch((err) => {
  console.log('Connect failed!', err)
});

const Post = require('./models/post');

// Instantiate express into app.
const app = express();

app.use(bodyParser.json());

// Use some middleware
// Takes a request, gives a response

// We need to set some some headers to get around CORS Errors.
// We set the headers that carry information about the client browser,
// the requested page, the server, and more.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});


// When the front end GETS @ this URL, we are returning a payload of the
// posts and also a message indicating a successful or failed API call
app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts: documents
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Post deleted'
    });
  })
});

module.exports = app;

