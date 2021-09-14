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
    next(error);
  }
});
module.exports = routineActivitiesRouter;
