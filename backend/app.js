// Import express.
const express = require('express');
// Import body parser middleware.
const bodyParser = require('body-parser');

// Instantiate express into app.
const app = express();

app.use(bodyParser.json());
// sean
// UmRMY6EEJj39Dk6
// Use some middleware
// Takes a request, gives a response

// We need to set some some headers to get around CORS Errors.
// We set the headers that carry information about the client browser,
// the requested page, the server, and more.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Header', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log('Posted', post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});


// When the front end GETS @ this URL, we are returning a payload of the
// posts and also a message indicating a successful or failed API call
app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'fsdfq23',
      title: 'First server-side post',
      content: 'This is coming from the server.'
    },
    {
      id: 'fxvcbb23',
      title: 'Second server-side post',
      content: 'This is coming from the server!'
    },
  ]

  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

module.exports = app;

