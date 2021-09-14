const express = require('express');

const routinesRouter = express.Router();

const {
  createRoutine, getRoutinesWithoutActivities, updateRoutine, destroyRoutine, getRoutineById,
} = require('../db');

// routines
// GET /routines
routinesRouter.get('/', async (req, res, next) => {
  try {
    const {
      isPublic, name, goal = '',
    } = req.body;
    const routineData = {};
    routineData.isPublic = isPublic;
    routineData.name = name;
    routineData.goal = goal;
    // TODO: Make sure the variables for this are coming from somewhere / set in this function
    const routine = await createRoutine(routineData);
    // Return a list of public routines, include the activities with them

    res.send({ routine });
  } catch (error) {
    console.log('error in get routines route: ', error);
    next(error);
  }
});
// POST /routines (*)

routinesRouter.post('/', async (req, res, next) => {
  try {
    // Make sure that this is working, remember to execute getRoutinesWithoutActivities by adding ()
    const routines = await getRoutinesWithoutActivities();
    // Create a new routine
    res.send({ routines });
  } catch (error) {
    console.log('error in post routines route: ', error);
    next(error);
  }
});
// PATCH /routines/:routineId (**)
routinesRouter.patch('/:routineId', async (req, res, next) => {
  try {
    const { routineToUpdate } = req.body;
    // req.body => the body of the request passed in
    // req.params => Where your url parameters live
    const { routineId } = req.params;
    const routineData = {};

    routineData.id = req.params.routineId;
    const routine = await updateRoutine(routineToUpdate, routineId);
    // TODO: Make sure the variables for this are coming from somewhere / set in this function

    // Return a list of public routines, include the activities with them

    res.send({ routine });

    //     => req.params.routineId => id of the routine you're looking to update

    // Tim: figure out what to do with routineToUpdate
    //  Update a routine, notably change public/private, the name, or the goal
  } catch (error) {
    console.log('error in get routines patch: ', error);
    next(error);
  }
});

// DELETE /routines/:routineId (**)
routinesRouter.delete('/:routineId', async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const routineData = {};
    // req.params => Where your url parameters live
    //     => req.params.routineId => id of the routine you're looking to delete
    routineData.id = req.params.routineId;
    const deleteRoutine = await destroyRoutine(routineId);
    //  Hard delete a routine. Make sure to delete all
    // the routineActivities whose routine is the one being deleted.
    res.send({ deleteRoutine });
  } catch (error) {
    console.log('error in delete routines route: ', error);
    next(error);
  }
});

// POST /routines/:routineId/activities
routinesRouter.post('/:routineId/activities', async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const activityData = {};
    activityData.id = req.params.routineId;
    const routine = await getRoutineById(activityData, routineId);
    // Attach a single activity to a routine. Prevent duplication on (routineId, activityId) pair.
    res.send({ routine });
  } catch (error) {
    console.log('error in post /:routineId/activities route: ', error);
    next(error);
  }
});

module.exports = routinesRouter;
