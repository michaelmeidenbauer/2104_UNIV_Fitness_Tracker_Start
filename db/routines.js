const { client } = require('./client');
const { getUserById } = require('./users');
const { getRoutineactivityByRoutineId, getRoutineActivitiesByRoutine } = require('./routine_activities');
// const { getActivityById } = require('./activities');

async function getActivityById(activityId) {
    try {
        const { rows: [ activity ] } = await client.query(`
          SELECT * FROM activities
          WHERE id=${activityId};
        `);
        return activity;
    } catch (error) {
        throw error;
    }
};

async function createRoutine({
    creatorId,
    isPublic,
    name,
    goal
}) {
    try {
        const { rows: [routine] } = await client.query(`
          INSERT INTO routines("creatorId", "isPublic", name, goal) 
          VALUES($1, $2, $3, $4)
          RETURNING *;
        `, [creatorId, isPublic, name, goal]);
        return routine;
    } catch (error) {
        throw error;
    }
};

async function getRoutinesWithoutActivities() {
    try {
        const { rows } = await client.query(`
          SELECT * FROM routines;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
};

async function getAllRoutines() {
    try {
        //REFACTOR THIS LATER WITH BETTER SQL QUERIES
        const { rows: routines } = await client.query(`
        SELECT * FROM routines;
        `);
        for (const routine of routines) {
            const { username } = await getUserById(routine.creatorId);
            const routineId = routine.id;
            routine.creatorName = username;
            routine.activities = [];

            const activityIds = await getRoutineActivitiesByRoutine(routineId);

            for (const activity of activityIds) {
                const activityId = activity.activityId;
                const fetchedActivity = await getActivityById(activityId);
                const { rows: [ { duration, count }] } = await client.query(`
                    SELECT duration, count from routineactivities
                    WHERE "routineId"=${routineId} and "activityId"=${activityId};
                `);
                fetchedActivity.duration = duration;
                fetchedActivity.count = count;
                routine.activities.push(fetchedActivity);
            }
        };
        return routines;
    } catch (error) {
        throw error;
    }
};

async function getRoutineById(id) {
    try {
        const { rows: [routine] } = await client.query(`
          SELECT * FROM routines
          WHERE id=${id};
        `);
        return routine;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createRoutine,
    getRoutinesWithoutActivities,
    getRoutineById,
    getAllRoutines,
    getActivityById
}