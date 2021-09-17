const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const apiRouter = require('./api');
const { client } = require('./db');

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api', apiRouter);

// app.use((req = error, res, next) => {
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.send(error);
});

app.listen(PORT, async () => {
  try {
    await client.connect();
    console.log('connected to db');
    console.log('The server is up on port', PORT);
  } catch (error) {
    console.error(error);
  }
});
