// Access point for database

const db = require("./db")
const Item = require("./models/item")
const Session = require("./models/session")
const User = require("./models/user")
const Group = require('./models/group')

// an item is an icon/image based on points

User.hasMany(Session)
User.hasMany(Item)

Session.belongsTo(User)
Item.belongsTo(User)

User.belongsTo(Group)
Group.hasMany(User)

// Session Model will have FK of userID
// Item Model will have PK of userID

// Item.belongsToMany(User, { through: UserItems })
// User.belongsToMany(Item, { through: UserItems })

module.exports = {
  db,
  Item,
  Session,
  User,
  Group
}
