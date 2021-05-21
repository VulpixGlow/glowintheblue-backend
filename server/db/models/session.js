const Sequelize = require("sequelize")
const db = require("../db")

// Incrementing and Decrementing Integer Values https://sequelize.org/master/manual/model-instances.html

const Session = db.define("session", {
  time: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 7200
    }
  },
  categoryName: {
    type: Sequelize.ENUM(["Move", "Other", "Meditate", "Focus", "Connect"]),
    defaultValue: "Other"
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  }
})

module.exports = Session
