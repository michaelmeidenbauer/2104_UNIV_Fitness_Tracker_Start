// routine_activities

const express = require("express");
const routine_activitiesRouter = express.Router();

const { addActivityToRoutine } = require("../db");

// PATCH /routine_activities/:routineActivityId (**)
activitiesRouter.patch(
  "routine_activities/:routineActivityId",
  async (req, res) => {
    const routine_activities = addActivityToRoutine(
      routineId,
      activityId,
      count,
      duration
    );
    res.send(
      routine_activities,
      "Update the count or duration on the routine activity"
    );
  }
);

// DELETE /routine_activities/:routineActivityId (**)

module.exports = routine_activitiesRouter;
