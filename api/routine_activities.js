// routineActivities

const express = require('express');

const routineActivitiesRouter = express.Router();

const { addActivityToRoutine, destroyRoutineActivity } = require('../db');

// PATCH /routineActivities/:routineActivityId (**)
routineActivitiesRouter.patch('/:routineActivityId', async (req, res, next) => {
  try {
    const { routineActivityId } = req.params;
    const {
      routineId, activityId, count, duration,
    } = req.body;
    const routineActivities = await addActivityToRoutine(
      routineId,
      activityId,
      count,
      duration,
      routineActivityId,
    );
    // Update the count or duration on the routine activity
    res.send(
      routineActivities,
    );
  } catch (error) {
    console.log('error in patch routineActivities route: ', error);
    next(error);
  }
});

// DELETE /routineActivities/:routineActivityId (**)
routineActivitiesRouter.delete('/:routineActivityId', async (req, res, next) => {
  try {
    const { routineActivityId } = req.params;
    const deleteRoutineActivity = await destroyRoutineActivity(routineActivityId);
    //  Remove an activity from a routine, use hard delete
    res.send(deleteRoutineActivity);
  } catch (error) {
    console.log('error in delete routineActivities route: ', error);
    next(error);
  }
});
module.exports = routineActivitiesRouter;
