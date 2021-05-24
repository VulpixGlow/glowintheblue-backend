const router = require("express").Router();
const Session = require("../db/models/session");
const User = require("../db/models/user");

module.exports = router;

// exclude emails from the returned data

router.get("/", async (req, res, next) => {
  try {
    const allSessions = await Session.findAll({
      include: [User]
    });
    //console.log("hello from sessions Route");
    res.json(allSessions);
  } catch (error) {
    next(error);
  }
});

router.put("/update", async (req, res, next) => {
  //console.log("Inside Updated Route");

  let [user, wasCreated] = await User.findOrCreate({
    where: {
      email: req.body.email
    },
    include: [Session]
  });

  const newSession = await Session.create({
    categoryName: req.body.categoryName,
    time: req.body.time,
    points: req.body.points
  });

  await user.addSession(newSession);

  // user = await user.update({
  //   totalPoints: user.totalPoints + req.body.userPoints
  // });
  // res.json(user);
  user = await user.update({
    totalPoints: req.body.userPoints
  });
  res.json(user);
});
