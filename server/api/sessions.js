const router = require("express").Router()
const Session = require("../db/models/session")
const User = require("../db/models/user")

module.exports = router

// exclude emails from the returned data

router.get("/", async (req, res, next) => {
  try {
    const allSessions = await Session.findAll({
      include: [User]
    })
    console.log('hello from sessionsRoute')
    res.json(allSessions)
  } catch (error) {
    next(error)
  }
})
