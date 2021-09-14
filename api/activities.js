// "use strict";
// Uncomment the above code for blow-up mode

// activities
const express = require('express');

const activitiesRouter = express.Router();

const { createActivity, getAllActivities, updateActivity } = require('../db');

// GET /activities
activitiesRouter.get('/', async (req, res, next) => {
  try {
    console.log('in all activities route');
    const activities = await getAllActivities();
    // Just return a list of all activities in the database
    console.log('fetched activities: ', activities);
    res.send(activities);
  } catch (error) {
    console.log('error in get activities route: ', error);
    next(error);
  }
});

// POST /activities (*)

activitiesRouter.post('/', async (req, res, next) => {
  try {
    const { name, description } = req.body;
    // TODO: Make sure you're defining variables before they're used
    const activities = await createActivity({
      name,
      description,
    });
    // Create a new activity
    res.send({ activities });
  } catch (error) {
    console.log('error in post activities route: ', error);
    next(error);
  }
});

// PATCH /activities/:activityId (*)

activitiesRouter.patch('/:activityId', async (req, res, next) => {
  try {
    const { activityId } = req.params;
    // Await and execute this
    const activities = await updateActivity(activityId);
    // Anyone can update an activity
    res.send({ activities });
  } catch (error) {
    console.log('error in patch activities route: ', error);
    next(error);
  }
});

// GET /activities/:activityId/routines

activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
  try {
    // const publicRoutines = getAllPublicRoutines;
    const { activityId } = req.params;
    // Await and execute this
    const routines = await updateActivity(activityId);
    // Get a list of all public routines which feature that activity
    res.send({ routines });
  } catch (error) {
    console.log('error in get /:activityId/routines route: ', error);
    next(error);
  }
});

module.exports = activitiesRouter;
