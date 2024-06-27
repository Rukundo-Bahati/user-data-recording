const _ = require("lodash");
// const config = require("config");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const Joi = require("joi");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) return res.status(400).send("Invalid Email");

    const validPassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!validPassword) return res.status(400).send("Invalid Password");

    const token = existingUser.generateAuthToken();
    res.status(200).send({ data: token, message: "logged in successfully" });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

function validate(data) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
}

module.exports = router;
