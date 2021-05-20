const router = require("express").Router();
const User = require("../db/models/user");

module.exports = router;

router.get("/", (req, res, next) => {
  try {
    res.send("Hello");
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log("HERES THE BODY", req.body.emails);
  try {
    const users = await Promise.all(
      req.body.emails.map((email) =>
        User.findOne({
          where: {
            email: email,
          },
        })
      )
    );
    res.json([users]);
    console.log("USERSSS", users);
    // res.send("IM IN POST ROUTE");
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
