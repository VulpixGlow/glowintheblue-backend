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
    // console.log(Object.keys(User.prototype))

    const user = await User.findOne({
      where: {
        email: req.body.email
      },
      include: [Session]
    })

    console.log("Returned from findUser", user)
    await user.update({
      totalPoints: user.totalPoints + req.body.userPoints
    })

    const newSession = await Session.create({
      categoryName: req.body.categoryName,
      time: req.body.time,
      points: req.body.points
    })

    await user.addSession(newSession)

    // user.totalPoints = req.body.userPoints
    // await user.save({ fields: ["totalPoints"] })
    // await user.reload()
    res.send("Yay!")
  } catch (error) {
    next(error)
  }
})
