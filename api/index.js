// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require('express');
const userRouter = require('./user');

const apiRouter = express.Router();

apiRouter.get('/health', (req, res, next) => {
  res.send({
    message: 'Up and running!',
  });
});

apiRouter.use('/users', userRouter);

apiRouter.use((error, req, res) => {
  res.send(error);
});

module.exports = apiRouter;
