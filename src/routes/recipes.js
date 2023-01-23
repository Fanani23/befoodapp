const express = require("express");
const router = express.Router();
const { recipesController } = require("../controllers/recipes");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/user-auth");

router.post("/", upload, protect, recipesController.insert);
router.post("/comments/:id", protect, recipesController.addComents);
router.post("/save", protect, recipesController.addBookmark);
router.put("/update/:id", upload, recipesController.update);
router.delete("/delete/:id", recipesController.delete);
router.get("/detail/:id", recipesController.detail);
router.get("/user-recipes/", protect, recipesController.recipeUser);
router.get("/search", recipesController.sort);
router.get("/save", protect, recipesController.getBookmark);
router.delete("/save/:id", recipesController.deleteBookmark);
router.get("/comments/:id", recipesController.getComment);
router.post("/liked", protect, recipesController.addLike);
router.get("/liked", protect, recipesController.getLiked);
router.delete("/liked/:id", recipesController.deleteLike);

module.exports = router;
