const Sequelize = require('sequelize');

// configure database connection according to environment variables
const username = process.DATABASE_USERNAME || 'urbex';
const password = process.DATABASE_PASSWORD || 'root';
const host = process.DATABASE_HOST || 'hybrid-database';
const databaseName = process.DATABASE_NAME || 'urbex';


const sequelize = new Sequelize(databaseName, username, password, {
  host: host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;