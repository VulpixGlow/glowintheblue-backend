// Bring in all you user models

// When we require these models it will go the server file look at the index.js file FIRST to find the models
const { User, Session, Item, Group } = require("../server/db")

// Bring in all your test data
const userData = require("../seed/UserData")
const sessionData = require("../seed/SessionData")
const itemData = require("../seed/ItemData")
const groupData = require('../seed/GroupData')

const db = require("../server/db/db")

const seed = async () => {
  try {
    await db.sync({ force: true })
    // await User.bulkCreate(users)
    await User.bulkCreate(userData)
    await Session.bulkCreate(sessionData)
    await Item.bulkCreate(itemData)
    await Group.bulkCreate(groupData)
  } catch (error) {
    console.log("error", error)
    db.close()
  }
}

module.exports = seed

//https://stackoverflow.com/questions/45136831/node-js-require-main-module

if (require.main === module) {
  seed()
    .then(() => {
      console.log("Seeding success!")
      db.close()
    })
    .catch(err => {
      console.error("Oh noes! Something went wrong!")
      console.error(err)
      db.close()
    })
}
