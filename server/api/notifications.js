const router = require("express").Router();
import axios from "axios";

module.exports = router;

router.get("/", (req, res, next) => {
  try {
    res.send("Hello");
  } catch (error) {
    next(error);
  }
});

const testAxios = async () => {
  const { data } = await axios.get(
    "https://glowintheblue.herokuapp.com/api/test"
  );
  console.log("Data -->", data);
};

testAxios();
