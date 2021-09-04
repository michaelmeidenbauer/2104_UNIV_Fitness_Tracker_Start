const { client } = require('./client');
async function addActivityToRoutine({
    routineId,
    activityId,
    count,
    duration
}) {
    try {
        const { rows: [routine_activity] } = await client.query(`
        INSERT INTO routineactivities("routineId", "activityId", count, duration) 
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `, [routineId, activityId, count, duration]);
        return routine_activity;
    } catch (error) {
        throw error;
    }
};

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

async function getRoutineActivitiesByRoutine(routineId) {
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

module.exports = {
    addActivityToRoutine,
    getRoutineactivityByRoutineId,
    getRoutineActivitiesByRoutine,
}