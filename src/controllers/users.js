const { response } = require("../helpers/common");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { generateToken } = require("../helpers/auth");
const email = require("../middlewares/mailer");
const ModelUsers = require("../models/users");
const Port = process.env.PORT;
const Host = process.env.HOST;

const userController = {
  insert: async (req, res) => {
    let {
      rows: [users],
    } = await ModelUsers.checkEmail(req.body.email);
    if (users) {
      return response(res, 403, false, [], "Register failed");
    }

    let digits = "0123456789";
    let token = "";
    for (let i = 0; i < 6; i++) {
      token += digits[Math.floor(Math.random() * 10)];
    }

    let password = bcrypt.hashSync(req.body.password);
    let data = {
      id_users: uuidv4(),
      email: req.body.email,
      password,
      username: req.body.name,
      phonenumber: req.body.phonenumber,
      token,
    };

    try {
      const result = await ModelUsers.createUsers(data);
      if (result) {
        console.log(result);
        let sendEmail = await email(
          data.email,
          token,
          `https://${Host}:${Port}/${email}/${token}`,
          data.fullname
        );
        if (sendEmail == "Email not send") {
          return response(res, 404, false, null, "Register fail");
        }
        response(
          res,
          200,
          true,
          { email: data.email },
          "Register success please check your email"
        );
      }
    } catch (err) {
      response(res, 404, false, err, " Register fail");
    }
  },
  login: async (req, res) => {
    try {
      const email = req.body.email;
      let {
        rows: [users],
      } = await ModelUsers.checkEmail(email);
      if (!users) {
        return response(res, 404, false, null, "Email not found");
      }
      if (users.auth == 0) {
        return response(res, 404, false, null, "Email not verified");
      }
      const password = req.body.password;
      const validation = bcrypt.compareSync(password, users.password);
      const id_users = users.id_users;
      if (!validation) {
        return response(res, 404, false, null, "Wrong password");
      }
      delete users.password;
      delete users.otp;
      delete users.auth;
      let payload = {
        email: users.email,
        id: users.id_users,
      };
      users.token = generateToken(payload);
      res.cookie("user", users.token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      });
      response(res, 200, true, users, "Login success");
    } catch (err) {
      return response(res, 404, false, err, "Login failed");
    }
  },
  getDetailUsers: (req, res) => {
    const user = req.payload.id;
    ModelUsers.detailUser(user)
      .then((result) =>
        response(res, 200, true, result.rows, "Get data success")
      )
      .catch((err) => response(res, 404, false, err, "Get data fail"));
  },
  updatePhoto: async (req, res) => {
    const id_users = req.payload.id;
    console.log(id_users, "the id");
    const {
      photo: [photo],
    } = req.files;

    req.body.photo = photo.path;

    ModelUsers.updatePhoto(id_users, req.body)
      .then((result) =>
        response(res, 200, false, result, "Update photo success")
      )
      .catch((err) => response(res, 400, false, err, "Update photo failed"));
  },
  auth: async (req, res, next) => {
    console.log("email", req.body.email);
    console.log("password", req.body.otp);
    let {
      rows: [users],
    } = await ModelUsers.findEmail(req.body.email);
    if (!users) {
      return response(res, 404, false, null, "Email not found");
    }
    if (users.token == req.body.otp) {
      const result = await ModelUsers.verification(req.body.email);
      return response(res, 200, true, result, "Verification email success");
    }
    return response(res, 404, false, null, "Wrong otp please check your email");
  },
};

exports.userController = userController;
