const { client } = require('./client');
const { createQuerySetString } = require('./utils');

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const { rows: [routineActivity] } = await client.query(`
        INSERT INTO routineactivities("routineId", "activityId", count, duration) 
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `, [routineId, activityId, count, duration]);
    return routineActivity;
  } catch (error) {
    throw error;
  }
}

async function getRoutineactivityByRoutineId(routineId) {
  try {
    const { rows: [routineactivity] } = await client.query(`
          SELECT * FROM routineactivities
          WHERE "routineId"=${routineId};
        `);
    return routineactivity;
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivitiesByRoutine({ id: routineId }) {
  try {
    const { rows } = await client.query(`
          SELECT "activityId" FROM routineactivities
          WHERE "routineId"=${routineId};
        `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateRoutineActivity(routineactivityToUpdate) {
  const { id } = routineactivityToUpdate;

  const setString = createQuerySetString(routineactivityToUpdate);

  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [routineactivity] } = await client.query(`
        UPDATE routineactivities
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `, Object.values(routineactivityToUpdate));
    return routineactivity;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(routineActivityId) {
  try {
    const { rows: [deletedRoutineactivity] } = await client.query(`
          DELETE FROM routineactivities
          WHERE id=${routineActivityId}
          RETURNING *;
        `);
    return deletedRoutineactivity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addActivityToRoutine,
  getRoutineactivityByRoutineId,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
};
