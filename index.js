// create the express server here
var express = require('express');
var cors = require('cors');
var app = express();
const apiRouter = require('./api');
const morgan = require('morgan');
const { client } = require('./db');
const PORT = 3000;

app.use(cors());
app.use(morgan('dev'));

app.use('/api', apiRouter);

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(PORT, function () {
  try {
    client.connect();
    console.log('connected to db');
} catch (error) {
    console.error(error);
}
console.log('The server is up on port', PORT);
});
