const Sequelize = require("sequelize");
const db = require("../db");

const Notifications = db.define("notification", {
  groupDetails: {
    type: Sequelize.STRING
  }
  // ownerEmail: {
  //   type: Sequelize.STRING,
  // }
});

module.exports = Notifications;
