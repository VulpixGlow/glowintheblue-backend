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
    res.json(allSessions)
  } catch (error) {
    next(error)
  }
})

router.put("/update", async (req, res, next) => {
  try {
    console.log("PUT ROUTE", req.params)
    console.log("Body", req.body)
    console.log("User Points", req.body.userPoints)
    const user = await User.findOne({
      where: {
        email: req.body.email
      },
      include: [Session]
    })

    console.log("Returned from findUser", user)
    user.update({
      totalPoints: req.body.userPoints
    })
    // user.totalPoints = req.body.userPoints
    await user.save({ fields: ["totalPoints"] })
    await user.reload()
  } catch (error) {
    next(error)
  }
})
