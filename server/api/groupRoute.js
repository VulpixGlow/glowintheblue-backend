const router = require("express").Router();
const User = require("../db/models/user");
const Group = require("../db/models/group");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    //console.log("req.body", req.body);
    //console.log("req.param", req.params);
    const user = await User.findAll({
      include: [Group]
    });
    //const groups = await Group.findByFk(user.id)
    //console.log("Back groupRoute line 16", user);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {email: req.body.email}
    })
    const group = await Group.findByPk(req.body.groupId)
    await group.addUser([user])
    res.json(group)
  } catch (e) {
    next(e)
  }
})


// router.get("/:groupId", async (req, res, next) => {
//   try {
//     const group = await Group.findByPk(req.params.groupId, {
//       include: [User]
//     })
//     //console.log('Back group line 24')
//     res.json(group)
//   } catch (error) {
//     next(error)
//   }
// })
