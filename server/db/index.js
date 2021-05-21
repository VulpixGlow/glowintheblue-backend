// Access point for database

const db = require("./db");
const Item = require("./models/item");
const Session = require("./models/session");
const User = require("./models/user");
const Group = require("./models/group");
const Notifications = require("./models/notifications");

// an item is an icon/image based on points

User.hasMany(Session);
User.hasMany(Item);
User.belongsToMany(Group, { through: 'user_group' })

Session.belongsTo(User);
Item.belongsTo(User);
Group.belongsToMany(User, { through: 'user_group' })

User.hasMany(Notifications);
Notifications.belongsTo(User);
// Session Model will have FK of userID
// Item Model will have PK of userID

// Item.belongsToMany(User, { through: UserItems })
// User.belongsToMany(Item, { through: UserItems })

module.exports = {
  db,
  Item,
  Session,
  User,
  Group,
  Notifications,
};
