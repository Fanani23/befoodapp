const pool = require("../configs/db");

const addRecipes = ({ name, photo, video, description }, id_users) => {
  console.log(id_users, "id model");
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO recipes(recipes_name,photo,video,description,id_users) VALUES ('${name}','${photo}','${video}','${description}','${id_users}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const updateRecipes = (id, { name, photo, video, description }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE recipes SET recipes_name='${name}',photo='${photo}',video='${video}',description='${description}' WHERE id_recipes='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const deleteRecipes = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM recipes WHERE id_recipes='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const detailRecipes = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM recipes WHERE id_recipes='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const recipeUsers = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM recipes WHERE id_users='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};
const addComents = (data) => {
  const { id_users, id_recipes, comments } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO comments(comments,id_users,id_recipes) VALUES ('${comments}','${id_users}','${id_recipes}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const saveRecipes = ({ id_resep }, id_users) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO bookmarks(id_users,id_recipes) VALUES ('${id_users}','${id_resep}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const likeRecipes = ({ id_resep }, id_users) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO liked(id_users,id_recipes) VALUES ('${id_users}','${id_resep}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getComents = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT comments.id,users.name,users.photo,comments.comments from comments, users WHERE id_recipes='${id}' AND comments.id_users=users.id_users`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getBookmark = (id_users) => {
  console.log(id_users);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT bookmarks.id,recipes.recipes_name, recipes.photo ,recipes.id_recipes from bookmarks,recipes WHERE bookmarks.id_users='${id_users}' AND bookmarks.id_recipes=recipes.id_recipes
      `,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getLiked = (id_users) => {
  console.log(id_users);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT liked.id,recipes.recipes_name, recipes.photo ,recipes.id_recipes from liked,recipes WHERE liked.id_users='${id_users}' AND liked.id_recipes=recipes.id_recipes
      `,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const sort = ({ limit, offset, sort, sortby, search }) => {
  console.log(limit, offset, sort, sortby);
  return pool.query(
    `SELECT recipes.id_recipes, recipes.recipes_name, recipes.photo from recipes WHERE (recipes.recipes_name) ILIKE ('%${search}%') 
    ORDER BY recipes.${sortby} ${sort} LIMIT ${limit} OFFSET ${offset} `
  );
};

const deleteBookmark = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM bookmarks WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

const deleteLike = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM liked WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  addRecipes,
  updateRecipes,
  deleteRecipes,
  detailRecipes,
  recipeUsers,
  addComents,
  getComents,
  saveRecipes,
  sort,
  getBookmark,
  likeRecipes,
  getLiked,
  deleteBookmark,
  deleteLike,
};
