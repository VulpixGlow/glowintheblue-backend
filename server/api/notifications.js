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
    user: "glowintheblue@gmail.com",
    pass: process.env.NODEMAILER_PASS
  }
});

router.get("/", async (req, res, next) => {
  try {
    const notifications = await Notifications.findAll();
    res.json(notifications);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  //console.log("HERES THE BODY", req.body);
  // req.body is an empty object.
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
    //const user = await User.findOne({where: {email: req.body.email}})
    //find the index of emails that is not in our db
    const newEmailsIdx = users
      .map((user, idx) => {
        if (user === null) return idx;
      })
      .filter(idx => idx !== undefined);
    //find the list of emails that is not in our db
    const newEmails = newEmailsIdx.map(idx => req.body.emails[idx]);
    //console.log('new emails',newEmails)
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
    //console.log('all users in notif route', users)
    const filtered = users => {
      return users.filter(user => user !== null);
    };
    const newGroupUsers = filtered(users);
    //console.log('newUsers in notification route',newGroupUsers)
    const group = await Group.create({ groupName: req.body.groupName });
    await group.addUsers([user]);
    await group.addUsers(newGroupUsers);
    //console.log('new group created after notification',group)
    const notification = await Notifications.create({
      groupDetails: req.body.emails.join(","),
      userId: user.id
    });
    //console.log('notif line 75', group)
    //console.log('notif line 76', notification)
    res.json(newGroupUsers);
    //res.json(group);
    //console.log("USERSSS line 66", users);
  } catch (error) {
    next(error);
  }
});
//0- need route that will perform a q into user table to find user that matches email of email inputed
//this is a post req where email is part of req.body(an arr of emails, that well have to parse out, loop thru, promise.all to map over all users that exist)
// const users = await Promise.all(req.body.emails.map(email => User.findOne({ where: {email: email }})))
// want to make sure that your users array is a list of users and not promises

// some users might not exist -> filter out the users that are not here!

// Make a group! -> Make a new group instance (Group.create)
// Notification -> add to your notification table all of the user and group detaiil information (Notification.create)
// res.json(users)

// 1. make an axios req to the backend that checks for users
//

// When the app is loaded, you want to make a call to get your current notifications
// when the home page gets loaded, you can use a useEffect to make an axios call, and your dependency array should be []
// if the dependency array is empty, it acts as a componentDidMount
