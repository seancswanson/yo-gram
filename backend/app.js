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

const postsRoutes = require('./routes/posts');

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', postsRoutes);

module.exports = app;

