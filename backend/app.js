// Import express.
const express = require('express');

// Instantiate express into app.
const app = express();

// Use some middleware
// Takes a request, gives a response
app.use((req, res, next) => {
  console.log('First middleware.');
  next();
});

app.use((req, res, next) => {
  res.send('Hello from Express!');
});

module.exports = app;

