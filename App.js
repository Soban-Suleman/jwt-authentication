const bodyParser = require("body-parser");
const express = require("express");
require("./db/connection");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.get("/", (req, res, next) => {
  res.send("<h1>Backend running</h1>");
  next();
});
app.use("/users", userRoutes);
const port = 3000;

app.listen(process.env.PORT || port, () =>
  console.log(`listening on port ${port}!`)
);
