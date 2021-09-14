/* eslint-disable no-console */
// create the express server here
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const apiRouter = require('./api');
const { client } = require('./db');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api', apiRouter);

app.listen(PORT, () => {
  try {
    client.connect();
    console.log('connected to db');
    console.log('The server is up on port', PORT);
  } catch (error) {
    console.error(error);
  }
});
