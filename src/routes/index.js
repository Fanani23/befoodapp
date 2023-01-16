const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const recipeRouter = require("./recipes");

router.use("/users", userRouter);
router.use("/recipes", recipeRouter);

module.exports = router;
