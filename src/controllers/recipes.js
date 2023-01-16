require("dotenv").config();
const ModelRecipes = require("../models/recipes");
const { response } = require("../helpers/common");
const cloudinary = require("../configs/cloud");
const jwt = require("jsonwebtoken");

const recipesController = {
  insert: async (req, res) => {
    try {
      // const { id_users } = "a3bc1e68-3d93-459b-8748-56b9e63e228a";
      // const token = req.cookies;
      const id_users = req.payload.id;
      console.log(id_users, "the id");
      const {
        photo: [photo],
        video: [video],
      } = req.files;

      req.body.photo = photo.path;
      req.body.video = video.path;

      await ModelRecipes.addRecipes(req.body, id_users);
      return response(res, 200, true, req.body, "Create recipe success");
    } catch (err) {
      return response(res, 404, false, err, "Create recipe failed");
    }
  },
  update: async (req, res) => {
    try {
      const {
        photo: [photo],
        video: [video],
      } = req.files;

      req.body.photo = photo.path;
      req.body.video = video.path;

      await ModelRecipes.updateRecipes(req.params.id, req.body);
      return response(res, 200, true, req.body, "Update recipe success");
    } catch (err) {
      return response(res, 404, false, err, "Update recipe failed");
    }
  },
  delete: async (req, res) => {
    try {
      await ModelRecipes.deleteRecipes(req.params.id);
      response(res, 200, true, [], "Delete recipe success");
    } catch (err) {
      response(res, 404, false, err, "Delete recipe faill");
    }
  },
  detail: async (req, res) => {
    try {
      const recipes = await ModelRecipes.detailRecipes(req.params.id);

      response(res, 200, true, recipes.rows, "Get recipes success");
      // response(res, 200, true, comments.rows, "GET RECIPES DATA SUCCESS");
    } catch (error) {
      response(res, 404, false, error, "Get recipes failed");
    }
  },

  recipeUser: async (req, res) => {
    try {
      const id = req.payload.id;
      console.log(id, "the id");
      const result = await ModelRecipes.recipeUsers(id);
      response(res, 200, true, result.rows, "Get recipe success");
    } catch (error) {
      response(res, 404, false, error, [], "Get recipe failed");
    }
  },
  addComents: async (req, res) => {
    try {
      const id_users = req.payload.id;
      const id_recipes = req.params.id;
      const data = {
        id_users,
        id_recipes,
        comments: req.body.comments,
      };
      await ModelRecipes.addComents(data);
      response(res, 200, true, data, "Create comment success");
    } catch (error) {
      response(res, 404, false, error, "Create comment failed");
    }
  },

  addBookmark: async (req, res) => {
    try {
      const id_users = req.payload.id;
      await ModelRecipes.saveRecipes(req.body, id_users);

      response(res, 200, true, [], "Save recipe success");
    } catch (error) {
      response(res, 404, false, error, "Save recipe failed");
    }
  },
  addLike: async (req, res) => {
    try {
      const id_users = req.payload.id;
      const result = await ModelRecipes.likeRecipes(req.body, id_users);

      response(res, 200, true, [], "Like recipe success");
    } catch (error) {
      response(res, 404, false, error, "Like recipe failed");
    }
  },
  addComment: async (req, res) => {
    try {
      const id_users = req.payload.id;
      const result = await ModelRecipes.likeRecipes(req.body, id_users);

      response(res, 200, true, [], "RECIPES LIKED");
    } catch (error) {
      response(res, 404, false, error, "SAVING RECIPES FAILED");
    }
  },
  getBookmark: async (req, res) => {
    try {
      const id_users = req.payload.id;

      const result = await ModelRecipes.getBookmark(id_users);

      response(res, 200, true, result.rows, "Get saved recipe success");
    } catch (error) {
      response(res, 404, false, error, "Get saved recipe failed");
    }
  },

  getLiked: async (req, res) => {
    try {
      const id_users = req.payload.id;

      const result = await ModelRecipes.getLiked(id_users);

      response(res, 200, true, result.rows, "Get liked recipe success");
    } catch (error) {
      response(res, 404, false, error, "Get liked recipe failed");
    }
  },

  getComment: async (req, res) => {
    try {
      const result = await ModelRecipes.getComents(req.params.id);

      response(res, 200, true, result.rows, "Get recipe comment success");
    } catch (error) {
      response(res, 404, false, error, "Get recipe comment failed");
    }
  },
  sort: async (req, res, next) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "recipes_name";
      const sort = req.query.sort || "ASC";
      const search = req.query.search || "";
      const result = await ModelRecipes.sort({
        limit,
        offset,
        sort,
        sortby,
        search,
      });
      response(res, 200, true, result.rows, "Get data success");
    } catch (err) {
      console.log(err);
      response(res, 404, false, err, "Get data fail");
    }
  },
  deleteBookmark: async (req, res) => {
    try {
      await ModelRecipes.deleteBookmark(req.params.id);
      response(res, 200, true, [], "Delete data success");
    } catch (err) {
      response(res, 404, false, err, "Delete data faill");
    }
  },
  deleteLike: async (req, res) => {
    try {
      await ModelRecipes.deleteLike(req.params.id);
      response(res, 200, true, [], "Delete data success");
    } catch (err) {
      response(res, 404, false, err, "Delete data faill");
    }
  },
};

exports.recipesController = recipesController;
