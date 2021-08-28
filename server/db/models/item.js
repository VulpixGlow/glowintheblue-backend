const Sequelize = require("sequelize")
const db = require("../db")


const Item = db.define("item", {
  itemImage: {
    type: Sequelize.TEXT
  },
  isUnlocked: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  pointValue: {
    type: Sequelize.INTEGER,
    validate: {
      min: 3,
      max: 36
    }
  }
})

module.exports = Item
