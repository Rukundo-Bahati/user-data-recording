const mongoose = require("mongoose");
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  title: String,
  firstName: String,
  lastName: String,
  position: String,
  businessArena: String,
  employees: String,
  streetNr: String,
  additionalInfo: String,
  zipCode: String,
  place: String,
  country: String,
  code: String,
  phoneNumber: String,
  email: String,
  termsAccepted: Boolean,
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id}, config.get('JWTPRIVATEKEY'));
  return token;
}

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    position: Joi.string().required(),
    businessArena: Joi.string().required(),
    employees: Joi.string().required(),
    streetNr: Joi.string().required(),
    additionalInfo: Joi.string().allow(""),
    zipCode: Joi.string().required(),
    place: Joi.string().required(),
    country: Joi.string().required(),
    code: Joi.number().required(),
    phoneNumber: Joi.number().required(),
    email: Joi.string().required().email(),
    termsAccepted: Joi.boolean().required(),
 
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
