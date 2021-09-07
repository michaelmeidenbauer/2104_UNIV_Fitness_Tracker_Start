// routine_activities

const express = require("express");
const routine_activitiesRouter = express.Router();

const { addActivityToRoutine, destroyRoutineActivity } = require("../db");

// PATCH /routine_activities/:routineActivityId (**)
routine_activitiesRouter.patch(
  "routine_activities/:routineActivityId",
  async (req, res) => {
    const routine_activities = addActivityToRoutine(
      routineId,
      activityId,
      count,
      duration
    );
    // Update the count or duration on the routine activity
    res.send(
      routine_activities,
      "Update the count or duration on the routine activity"
    );
  }
);

// DELETE /routine_activities/:routineActivityId (**)
routine_activitiesRouter.delete("/routine_activities/:routineActivityId", async (req, res) => {
  const deleteRoutineActivity = await destroyRoutineActivity(routineActivityId);
//  Remove an activity from a routine, use hard delete
    res.send(deleteRoutineActivity);
});
module.exports = routine_activitiesRouter;
