import Joi from "joi";
// 🔹 REGISTER VALIDATOR
export const registerSchemaValidator = Joi.object({
  name: Joi.string().allow("", null),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  gender: Joi.string(),
  role: Joi.string(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,1a5}$/)
    .allow("", null),
  address: Joi.string().allow(""),
  city: Joi.string().allow(""),
  country: Joi.string().allow(""),
});

// 🔹 LOGIN VALIDATOR
export const loginSchemaValidator = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().required(),
});

