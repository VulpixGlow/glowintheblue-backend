const router = require("express").Router()
module.exports = router

router.get("/test", (req, res, next) => {
  res.send("Hello")
})

router.use((req, res, next) => {
  const error = new Error("Not Found")
  error.status = 404
  next(error)
})
