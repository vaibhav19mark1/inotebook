const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");

const JWT_SECRET="iamgoingtobuyalamborghini";

// create user using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid mail id").isEmail(),
    body("password", "Password must be at least of length 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If error occurs, then return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check if the user with this email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "User with this email already exists" });
      }
      // Create a new user
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data={
        user:{
          id: user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);

      // res.json(user);
      res.json({authtoken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured!");
    }
  }
);

module.exports = router;
