const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mainRouter = require("./src/routes/index");
const { response } = require("./src/helpers/common");
const app = express();
const xss = require("xss-clean");
const fs = require("fs");

app.use(xss());
app.use(morgan("dev"));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());

const port = process.env.PORT;

app.use(bodyParser.json());
app.use("/", mainRouter);

app.all("*", (req, res, next) => {
  response(res, 404, false, null, "404 Not Found");
});

app.get("/", (req, res, next) => {
  res.status(200).json({ status: "Success", statusCode: 200 });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
