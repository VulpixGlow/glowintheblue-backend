// Bring in all you user models

// When we require these models it will go the server file look at the index.js file FIRST to find the models
const { User, Session, Item, Group, Notifications } = require("../server/db")

// Bring in all your test data
const userData = require("../seed/UserData")
const sessionData = require("../seed/SessionData")
const itemData = require("../seed/ItemData")
//const groupData = require('../seed/GroupData')
const notificationData = require('../seed/NotificationData')

const db = require("../server/db/db")

const seed = async () => {
  try {
    await db.sync({ force: true })
    // await User.bulkCreate(users)
    await User.bulkCreate(userData)
    await Session.bulkCreate(sessionData)
    await Item.bulkCreate(itemData)
    await Notifications.bulkCreate(notificationData)
    const group1 = await Group.create({
      groupName: 'Vulpix'
    })
    const group2 = await Group.create({
      groupName: 'Amazing Vulpix'
    })
    const user1 = await User.create({
      email: "user1@gmail.com",
      totalPoints: 20,
    })
    const user2 = await User.create({
      email: "user2@gmail.com",
      totalPoints: 30,
    })
    const user3 = await User.create({
      email: "user3@gmail.com",
      totalPoints: 40,
    })
    const user4 = await User.create({
      email: "user4@gmail.com",
      totalPoints: 10,
    })
    const user5 = await User.create({
      email: "user5@gmail.com",
      totalPoints: 30,
    })
    const user6 = await User.create({
      email: "user6@gmail.com",
      totalPoints: 20,
    })
    await group1.addUser([user1, user2, user3])
    await group2.addUser([user4, user5, user6])
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
