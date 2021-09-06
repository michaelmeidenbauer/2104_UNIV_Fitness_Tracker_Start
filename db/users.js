const bcrypt = require('bcrypt');
const saltRounds = 10;
const { client } = require('./client');

async function createUser({
    username,
    password
}) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const { rows: [user] } = await client.query(`
          INSERT INTO users(username, password) 
          VALUES($1, $2) 
          ON CONFLICT (username) DO NOTHING 
          RETURNING *;
        `, [username, hashedPassword]);
        delete user.password;
        return user;
    } catch (error) {
        throw error;
    }
};

async function getUserByUsername(username) {
    try {
        const { rows: [ user ]} = await client.query(`
          SELECT * FROM users
          WHERE username='${username}';
        `);
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUser({ username, password }) {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    try {
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if (passwordsMatch) {
            delete user.password;
            return user;
        }
    } catch (error) {
        throw error;
    }
}


async function getUserById(id) {
    try {
        const { rows: [user] } = await client.query(`
          SELECT * FROM users
          WHERE id=${id};
        `);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUser,
    getUserByUsername,
    getUserById
}

