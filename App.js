const bodyParser = require("body-parser");
const express = require("express");
require("./db/connection");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/users", userRoutes);
const port = 3000;

app.listen(process.env.PORT || port, () =>
  console.log(`listening on port ${port}!`)
);
