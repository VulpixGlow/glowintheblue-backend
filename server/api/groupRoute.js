const router = require("express").Router()
const User = require('../db/models/user')
const Group = require('../db/models/group')

module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const group = await Group.findAll({
      include: [User]
    })
    console.log('Back group line 12')
    res.send(group)
  } catch (error) {
    next(error)
  }
})
