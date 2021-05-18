const Sequelize = require("sequelize")
const db = require("../db")

// Min points that can be earned for a 10 minute "session" is 3 points for every 10 minutes for a max of 36 points for a 2 hour session

const Notifications = db.define("notification", {
  newChallenge: {
    type: Sequelize.STRING
  },
})

module.exports = Notifications