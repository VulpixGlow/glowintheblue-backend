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
    console.log("hello from sessionsRoute");
    res.json(allSessions);
  } catch (error) {
    next(error);
  }
});

router.put("/update", async (req, res, next) => {
  try {
    console.log("PUT ROUTE", req.params);
    console.log("Body", req.body);
    console.log("User Points", req.body.userPoints);
    // console.log(Object.keys(User.prototype))

    const user = await User.findOrCreate({
      where: {
        email: req.body.email
      },
      include: [Session]
    });

    console.log("User Found or Created", user);
    // user type is object

    // console.log(
    //   "HOW DO I GET THESE VALUES!",
    //   user[0].user.dataValues.totalPoints
    // );
    // console.log("ARRAY?", user[0].user);

    // let updatedPoints =
    //   user[0].user.dataValues.totalPoints + req.body.userPoints;

    // console.log("Updated Points", updatedPoints);

    await user
      .where({ totalPoints })
      .update({
        totalPoints: user.dataValues.totalPoints + req.body.userPoints
      });

    console.log("LINE 41 Attempt to update", user);
    // await user.update({
    //   totalPoints: user.totalPoints + req.body.userPoints
    // });

    // await user.save();

    const newSession = await Session.create({
      categoryName: req.body.categoryName,
      time: req.body.time,
      points: req.body.points
    });

    await user.addSession(newSession);

    // user.totalPoints = req.body.userPoints
    // await user.save({ fields: ["totalPoints"] })
    // await user.reload()
    res.send("Yay!");
  } catch (error) {
    next(error);
  }
});
