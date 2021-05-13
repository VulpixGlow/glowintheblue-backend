const Sequelize = require("sequelize")
const db = require("../db")

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = User
