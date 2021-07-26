import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

//@route POST api/users/register
//@desc Register User
//@access Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) return res.status(400).json({ info: "Email already exists" });
    let d = new Date();
    const newuser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      date: `${d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear()}`,
    });

    //Hash password before saving
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newuser.password, salt, (err, hash) => {
        if (err) throw err;
        newuser.password = hash;
        newuser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
  });
});

//@route POST api/users/login
//@desc login user and return jwt
//@access Public

router.post("/login", (req, res) => {
  //Find user by email
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) return res.status(400).json({ info: "Email not found" });
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        //User matched
        //Create JWT payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        //Sign token
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: 604800, // 7days in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: token,
            });
          }
        );
      } else return res.status(400).json({ info: "password incorrect" });
    });
  });
});

export default router;
