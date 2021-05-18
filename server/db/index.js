// Access point for database

const db = require("./db")
const Item = require("./models/item")
const Session = require("./models/session")
const User = require("./models/user")
const Notifications =require("./models/notifications")

// an item is an icon/image based on points

User.hasMany(Session)
User.hasMany(Item)

Session.belongsTo(User)
Item.belongsTo(User)

Notifications.belongsTo(User)
// Session Model will have FK of userID
// Item Model will have PK of userID

// Item.belongsToMany(User, { through: UserItems })
// User.belongsToMany(Item, { through: UserItems })

module.exports = {
  db,
  Item,
  Session,
  User,
  Notifications
}
