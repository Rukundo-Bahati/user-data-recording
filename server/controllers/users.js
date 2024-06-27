const express = require("express");
const _ = require("lodash");
const config = require("config");
const debug = require("debug")("data");
const bcrypt = require("bcryptjs");
const { User, validate } = require("../models/user");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  if (users.length === 0) return res.status(404).send("No User Found.");
  res.send(users);
});

// Create a new user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(400).send("The user is already registered.");

  const newUser = new User(_.pick(req.body, [
    "title", "firstName", "lastName", "position", "businessArena", "employees",
    "streetNr", "additionalInfo", "zipCode", "place", "country", "code", 
    "phoneNumber", "email", "termsAccepted"
  ]));


  try {
    await newUser.save();
    const token = newUser.generateAuthToken();
    res.cookie("token", token, { httpOnly: true });
    res.send({ token });
  } catch (err) {
    debug(err);
    res.status(500).send("Internal Server Error");
  }
});

// Update an existing user
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User with the specified ID is not found.");

  const updatedFields = _.pick(req.body, [
    "title", "firstName", "lastName", "position", "businessArena", "employees",
    "streetNr", "additionalInfo", "zipCode", "place", "country", "code", 
    "phoneNumber", "email", "termsAccepted"
  ]);

  Object.assign(user, updatedFields);
  
  try {
    await user.save();
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({ token });
  } catch (err) {
    debug(err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send("User with the specified ID is not found.");
  res.send("User is deleted successfully.");
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User with the specified ID is not found.");
  res.send(user);
});

module.exports = router;
