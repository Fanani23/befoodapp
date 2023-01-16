const pool = require("../configs/db");

const createUsers = (data) => {
  const { id_users, email, username, password, phonenumber, token } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO users(id_users,email,name,password,phonenumber,auth,token,photo) VALUES ('${id_users}','${email}','${username}','${password}','${phonenumber}',0,'${token}',
      '')`,
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

const checkEmail = (email) => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT * FROM users where email='${email}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const detailUser = (id) => {
  return pool.query(
    `SELECT users.name, users.photo,users.phonenumber FROM users WHERE id_users='${id}' `
  );
};
const updatePhoto = (id, { photo }) => {
  return pool.query(`UPDATE users SET photo='${photo}' WHERE id_users='${id}'`);
};

const verification = (email) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `UPDATE users SET auth=1 WHERE "email"='${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};
const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT * FROM users where email='${email}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};
module.exports = {
  createUsers,
  checkEmail,
  updatePhoto,
  detailUser,
  verification,
  findEmail,
};
