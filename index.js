const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const { response } = require("./src/helpers/common");
const xss = require("xss-clean");
const mainRouter = require("./src/routes/index");
const fs = require("fs");

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: "https://befoodapp.vercel.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(xss());

app.use(express.urlencoded({ extended: true }));
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
