const router = require("express").Router()
const { User, Group } = require()

module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const group = await Group.findAll({
      include: User
    })
    console.log('group', group)
    res.send(group)
  } catch (error) {
    next(error)
  }
})
