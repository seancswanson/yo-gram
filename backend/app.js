// Import express.
const express = require('express');

// Instantiate express into app.
const app = express();

// Use some middleware
// Takes a request, gives a response
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Header', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', (req, res, next) => {
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

