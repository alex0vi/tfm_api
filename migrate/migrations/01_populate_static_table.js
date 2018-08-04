
const { readFileSync } =  require('fs');
const { resolve } = require('path');

const sqlUp = readFileSync(resolve(__dirname, './sql/populate-standing-table-up.sql'), 'utf8');

const sqlDown = readFileSync(resolve(__dirname, './sql/populate-standing-table-down.sql'), 'utf8');

module.exports = {
    up: ({ sequelize }) => sequelize.query(sqlUp),
    down: ({ sequelize }) => sequelize.query(sqlDown)
};
