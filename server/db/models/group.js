const Sequelize = require("sequelize")
const db = require("../db")

const Group = db.define("group", {
  groupName: {
    type: Sequelize.STRING,
    defaultValue: "MyGroup"
  }
})

module.exports = Group
