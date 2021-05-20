const Sequelize = require("sequelize")
const db = require("../db")

const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  totalPoints: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = User
