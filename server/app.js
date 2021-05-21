const path = require("path")
const express = require("express")
const morgan = require("morgan")
const app = express()
module.exports = app

// logging middleware
app.use(morgan("dev"))

// body parsing middleware
// increase body-parsing size limit --> https://reactgo.com/request-entity-too-large-node/
app.use(express.json({ limit: "25mb" })) //Used to parse JSON bodies
app.use(express.urlencoded({ limit: "25mb" })) //Parse URL-encoded bodies

// api/auth routes
app.use("/api", require("./api"))

// USE THIS ONCE YOU CREATE A LANDING PAGE FOR THE APP
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
)

// USE THIS ONCE YOU CREATE A LANDING PAGE FOR THE APP
// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found")
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// sends index.html is no ther path is found
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || "Internal server error.")
})
