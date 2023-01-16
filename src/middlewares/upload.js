const multer = require("multer");
const storage = require("../configs/cloud");

const upload = multer({
  storage: storage,
}).fields([
  {
    name: "photo",
    maxCount: 1,
  },
  {
    name: "video",
    maxCount: 1,
  },
]);

module.exports = upload;
