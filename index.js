// create the express server here
var express = require('express');
var cors = require('cors');
var app = express();
const apiRouter = express.Router();

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(3000, function () {
  console.log('CORS-enabled web server listening on port 5432')
})
