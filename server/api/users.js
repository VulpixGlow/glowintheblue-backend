const router = require("express").Router()
const Session = require("../db/models/session")
const User = require("../db/models/user")

module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [Session],
      attributes: {
        exclude: ["email"]
      }
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id, {
      include: [Session],
      attributes: {
        exclude: ["email"]
      }
    })

    if (!singleUser) {
      const err = Error("User not found")
      err.status = 404
      throw err
    }

    res.json(singleUser)
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    console.log("POST ROUTE", req.body.email)
    const newUser = await User.create({ email: req.body.email })
    console.log("New User", newUser)
    res.json(newUser)
  } catch (error) {
    next(error)
  }
})
