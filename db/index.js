//this is the access point for all things database related!
// In the db.js file we export the new sequelize instance which then gets labeled as db in this file
// updated
const db = require("./db")

//associations could go here!

module.exports = {
  db
}
