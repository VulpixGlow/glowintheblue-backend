const router = require("express").Router();
const User = require("../db/models/user");
const Group = require("../db/models/group");
const nodemailer = require("nodemailer");
const user = require("../../seed/UserData");
const Notifications = require("../db/models/notifications");

module.exports = router;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS
  }
});

router.get("/", async (req, res, next) => {
  try {
    const notifications = await Notifications.findAll({
      include: { model: User, include: [Group] }
    });
    res.json(notifications);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const users = await Promise.all(
      req.body.emails.map(email =>
        User.findOne({
          where: {
            email: email
          }
        })
      )
    );

    //find the index of emails that is not in our db
    const newEmailsIdx = users
      .map((user, idx) => {
        if (user === null) return idx;
      })
      .filter(idx => idx !== undefined);
    //find the list of emails that is not in our db
    const newEmails = newEmailsIdx.map(idx => req.body.emails[idx]);

    //trigger an email event to the emails above
    newEmails.map(
      email =>
        transporter.sendMail({
          from: "glowintheblue@gmail.com",
          to: email,
          subject: "You have been invited to Glow In The Blue",
          html: '<h1>Glow In The Blue</h1> <h3>An app designed to provide you with a cozy place for pacing your day!</h3> <img src="public/glowcover.png" alt="glow app cover">'
        }),
      function (error, info) {
        if (error) {
          console.log("Mail not sent", error);
        } else {
          console.log("Email sent:", +info.response);
        }
      }
    );
    const user = await User.findOne({
      where: { email: req.body.ownerEmail }
    });

    const filtered = users => {
      return users.filter(user => user !== null);
    };
    const newGroupUsers = filtered(users);

    const group = await Group.create({ groupName: req.body.groupName });
    await group.addUsers([user]);
    await group.addUsers(newGroupUsers);

    const notification = await Notifications.create({
      groupDetails: req.body.emails.join(","),

      userId: user.id
    });

    res.json(group);
  } catch (error) {
    next(error);
  }
});
