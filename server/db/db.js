const Sequelize = require("sequelize")
const pkg = require("../../package.json")

// goes into the package.json file and finds the name of the file to use to detemine the db
const databaseName = pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "")

const config = {
  logging: false
}

if (process.env.LOGGING === "true") {
  delete config.logging
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host

if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  config
)
module.exports = db

// CODE TO REVISIT IF WE DECIDE TO USE GOOGLE CLOUD

/* const Sequelize = require("sequelize")

const config = {
  logging: false
}

if (process.env.LOGGING === "true") {
  delete config.logging
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DB_NAME) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_INSTANCE = process.env.DB_INSTANCE

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: `/cloudsql/${process.env.DB_INSTANCE}`,
  dialect: "postgres",
  dialectOptions: {
    socketPath: `/cloudsql/${DB_INSTANCE}`
  },
  config
})

module.exports = db

*/