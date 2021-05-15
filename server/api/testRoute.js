const router = require("express").Router()

module.exports = router

router.get("/", (req, res, next) => {
  try {
    res.send("Hello")
  } catch (error) {
    next(error)
  }
})
