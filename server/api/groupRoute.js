const router = require("express").Router();
const User = require("../db/models/user");
const Group = require("../db/models/group");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findAll({
      include: [Group]
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    });
    const group = await Group.findByPk(req.body.groupId);
    await group.addUser([user]);
    res.json(group);
  } catch (e) {
    next(e);
  }
});
