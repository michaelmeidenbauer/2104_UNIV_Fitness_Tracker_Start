const express = require('express');

const activitiesRouter = express.Router();
require('dotenv').config();

const { JWT_SECRET = 'default' } = process.env;
const jwt = require('jsonwebtoken');
const {
  createActivity,
  getAllActivities,
  updateActivity,
} = require('../db');

activitiesRouter.get('/', async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.post('/', async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  const activityToCreate = req.body;
  if (!auth) {
    // nothing to see here
    return next();
  }
  if (auth.startsWith(prefix)) {
    try {
      const token = auth.slice(prefix.length);
      const { username } = jwt.verify(token, JWT_SECRET);
      if (username) {
        const activity = await createActivity(activityToCreate);
        return res.send(activity);
      }
    } catch ({ name, message }) {
      return next({ name, message });
    }
  } else {
    throw new Error({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

// activitiesRouter.post('/login', async (req, res, next) => {
//   try {
//     const { username: requestUser, password } = req.body;
//     if (!requestUser || !password) {
//       throw new Error({
//         name: 'LoginRequestError',
//         message: 'Please provide a username and password.',
//       });
//     }
//     // console.log('request deets: ', requestUser, password);
//     const { id, username } = await getUser({ username: requestUser, password });
//     // console.log('fetched username: ', username, 'fetched id: ', id);
//     if (!username) {
//       throw new Error({
//         name: 'LoginFailError',
//         message: 'Login attempt failed. Please try again.',
//       });
//     }
//     const token = jwt.sign({ username, id }, JWT_SECRET);
//     // console.log('created token: ', token);
//     // console.log('============= 70 SEND ===========');
//     res.send({
//       message: 'You are logged in.',
//       token,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// activitiesRouter.get('/me', async (req, res, next) => {
//   try {
//     const prefix = 'Bearer ';
//     const auth = req.header('Authorization');
//     if (!auth) {
//       // nothing to see here
//       return next();
//     }
//     if (auth.startsWith(prefix)) {
//       try {
//         const token = auth.slice(prefix.length);
//         const { id } = jwt.verify(token, JWT_SECRET);
//         console.log('id: ', id);
//         if (id) {
//           const user = await getUserById(id);
//           return res.send(user);
//         }
//       } catch ({ name, message }) {
//         return next({ name, message });
//       }
//     } else {
//       throw new Error({
//         name: 'AuthorizationHeaderError',
//         message: `Authorization token must start with ${prefix}`,
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = activitiesRouter;
