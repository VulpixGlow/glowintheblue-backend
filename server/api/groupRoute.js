const router = require("express").Router()
const User = require('../db/models/user')
const Group = require('../db/models/group')

module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const groups = await Group.findAll({
      include: [User]
    })
    console.log('Back groupRoute line 12')
    res.send(groups)
  } catch (error) {
    next(error)
  }
})

router.get("/:groupId", async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.groupId, {
      include: [User]
    })
    console.log('Back group line 24')
    res.send(group)
  } catch (error) {
    next(error)
  }
})
