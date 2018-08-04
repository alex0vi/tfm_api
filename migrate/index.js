'use strict';

const path              = require('path');
const child_process     = require('child_process');
const Promise           = require('bluebird');
const Sequelize         = require('sequelize');
const Umzug             = require('umzug');

// let {
//     ADDAPS_DB_API_HOST,
//     ADDAPS_DB_API_PORT,
//     ADDAPS_DB_API_USER,
//     ADDAPS_DB_API_PASS,
//     ADDAPS_DB_API_DATABASE_NAME
// } = process.env;


const DB_TYPE = 'mysql';
//const DB_HOST = process.env.DB_HOST || 'localhost';
//const DB_PORT = process.env.DB_PORT || 5432;

const DB_HOST = 'localhost';
const DB_PORT = '3306';
const DB_NAME = 'api';
const DB_USER = 'root';
const DB_PASS = 'root';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_TYPE,
  operatorsAliases: false, // disable aliases
  dialectOptions: {
      multipleStatements: true
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize: sequelize,
    },

    // see: https://github.com/sequelize/umzug/issues/17
    migrations: {
        params: [
            sequelize.getQueryInterface(), // queryInterface
            sequelize.constructor, // DataTypes
            function() {
                throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
            }
        ],
        path: 'migrations',
        pattern: /\.js$/
    },

    logging: function() {
        console.log.apply(null, arguments);
    }
});

//LOGS

function logUmzugEvent(eventName) {
    return function(name, migration) {
        console.log(`${ name } ${ eventName }`);
    }
}
umzug.on('migrating', logUmzugEvent('migrating'));
umzug.on('migrated',  logUmzugEvent('migrated'));
umzug.on('reverting', logUmzugEvent('reverting'));
umzug.on('reverted',  logUmzugEvent('reverted'));


//HELPER

function cmdStatus() {
    let result = {};

    return umzug.executed()
      .then(executed => {
        result.executed = executed;
        return umzug.pending();
    }).then(pending => {
        result.pending = pending;
        return result;
    }).then(({ executed, pending }) => {

        executed = executed.map(m => {
            m.name = path.basename(m.file, '.js');
            return m;
        });
        pending = pending.map(m => {
            m.name = path.basename(m.file, '.js');
            return m;
        });

        const current = executed.length > 0 ? executed[0].file : '<NO_MIGRATIONS>';
        const status = {
            current: current,
            executed: executed.map(m => m.file),
            pending: pending.map(m => m.file),
        }

        console.log(JSON.stringify(status, null, 2))

        return { executed, pending };
    })
}

function cmdMigrate() {
    return umzug.up();
}

function cmdMigrateNext() {
    return cmdStatus()
        .then(({ executed, pending }) => {
            if (pending.length === 0) {
                return Promise.reject(new Error('No pending migrations'));
            }
            const next = pending[0].name;
            return umzug.up({ to: next });
        })
}

function cmdReset() {
    return umzug.down({ to: 0 });
}

function cmdResetPrev() {
    return cmdStatus()
        .then(({ executed, pending }) => {
            if (executed.length === 0) {
                return Promise.reject(new Error('Already at initial state'));
            }
            const prev = executed[executed.length - 1].name;
            return umzug.down({ to: prev });
        })
}


function cmdSingleDown(name) {
    return cmdStatus()
        .then(({ executed, pending }) => {
            if (executed.length === 0) {
                return Promise.reject(new Error('Already at initial state'));
            }

            return umzug.down({ to: name });
        })
}


function cmdSingleUp(name) {
    return cmdStatus()
        .then(({ executed, pending }) => {
            if (pending.length === 0) {
                return Promise.reject(new Error('No pending migrations'));
            }

            return umzug.up({ to: name });
        })
}

function cmdHardReset() {
    return new Promise((resolve, reject) => {
        setImmediate(() => {
            try {
                console.log(`dropdb ${ DB_NAME }`);
                child_process.spawnSync(`dropdb ${ DB_NAME }`);
                console.log(`createdb ${ DB_NAME } --username ${ DB_USER }`);
                child_process.spawnSync(`createdb ${ DB_NAME } --username ${ DB_USER }`);
                resolve();
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    });
}

const cmd = process.argv[2].trim();
let migrationName;

if (process.argv.length === 4) {
    migrationName = process.argv[3].trim();
}

let executedCmd;

console.log(`${ cmd.toUpperCase() } BEGIN`);
switch(cmd) {
    case 'status':
        executedCmd = cmdStatus();
        break;

    case 'up':
    case 'migrate':
        executedCmd = cmdMigrate();
        break;

    case 'next':
    case 'migrate-next':
        executedCmd = cmdMigrateNext();
        break;

    case 'down':
    case 'reset':
        executedCmd = cmdReset();
        break;

    case 'prev':
    case 'reset-prev':
        executedCmd = cmdResetPrev();
        break;

    case 'reset-hard':
        executedCmd = cmdHardReset();
        break;
    case 'single-down':
        executedCmd = cmdSingleDown(migrationName);
        break;
    case 'single-up':
        executedCmd = cmdSingleUp(migrationName);
        break;
    default:
        console.log(`invalid cmd: ${ cmd }`);
        process.exit(1);
}

executedCmd
    .then((result) => {
        const doneStr = `${ cmd.toUpperCase() } DONE`;
        console.log(doneStr);
        console.log("=".repeat(doneStr.length));
    })
    .catch(err => {
        const errorStr = `${ cmd.toUpperCase() } ERROR`;
        console.log(errorStr);
        console.log("=".repeat(errorStr.length));
        console.log(err);
        console.log("=".repeat(errorStr.length));
    })
    .then(() => {
        if (cmd !== 'status' && cmd !== 'reset-hard') {
            return cmdStatus()
        }
        return Promise.resolve();
    })
    .then(() => process.exit(0))
