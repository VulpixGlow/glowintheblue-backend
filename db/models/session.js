const Sequelize = require("sequelize")
const db = require("../db")

// Time is calculated in seconds min of 10 mins 600 seconds or 2 hours 7200 seconds

const Session = db.define("session", {
  time: {
    type: Sequelize.INTEGER,
    validate: {
      min: 600,
      max: 7200
    }
  }
})

module.exports = Session
