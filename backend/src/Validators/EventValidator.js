import Joi from "joi";

// 🔹 CREATE EVENT VALIDATOR
export const createEventValidator= Joi.object({
  title: Joi.string().min(3).max(100).allow('', null),

  description: Joi.string().min(10).allow('', null),

  category: Joi.string().allow('', null),

  Eventtype: Joi.string().allow('', null),
banner_image: Joi.any().allow('', null),
 date: Joi.date().allow('', null),
tags:Joi.any().allow('', null),
  time: Joi.string().allow('', null),

  location: Joi.string().allow('', null),

  audienceSize: Joi.string().allow('', null),

  status: Joi.string().allow('', null),

  isPaid: Joi.boolean().allow('', null),

  price: Joi.when("isPaid", {
    is: true,
    then: Joi.number().min(0).allow('', null),
    otherwise: Joi.number().valid(0).default(0),
  }).allow('', null),

  contactEmail: Joi.string().email().allow('', null),

  contactPhone: Joi.string().pattern(/^[0-9]{10,15}$/).allow('', null),

  preferEvent: Joi.array().items(Joi.string()).allow('', null),

  startDateTime: Joi.date().allow('', null),

  endDateTime: Joi.date().greater(Joi.ref("startDateTime")).allow('', null),
});
