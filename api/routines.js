const express = require("express");
const routinesRouter = express.Router();

const { createRoutine, getRoutinesWithoutActivities } = require("../db");

// routines
// GET /routines
routinesRouter.get("/routines", async (req, res) => {
  const routine = await createRoutine(
    creatorId, 
    isPublic, 
    name, 
    goal);
});
// POST /routines (*)

routinesRouter.post("/routines", async (req, res) => {
  const routines = await getRoutinesWithoutActivities;

  res.send(routines, "Return All Routines Here");
});
// PATCH /routines/:routineId (**)

// DELETE /routines/:routineId (**)

// POST /routines/:routineId/activities

module.exports = routinesRouter;
