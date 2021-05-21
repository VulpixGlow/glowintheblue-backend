const Sequelize = require("sequelize")
const db = require("../db")

// Time is calculated in seconds min of 10 mins 600 seconds or 2 hours 7200 seconds

// Incrementing and Decrementing Integer Values --> Might be helpful for adding points to differente
// sessions - https://sequelize.org/master/manual/model-instances.html

const Session = db.define("session", {
  time: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 7200
    }
  },
  categoryName: {
    type: Sequelize.ENUM([
      "Sport",
      "Move",
      "Other",
      "Meditate",
      "Yoga",
      "Read",
      "Focus",
      "Connect"
    ]),
    defaultValue: "Other"
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  }
})

module.exports = Session
