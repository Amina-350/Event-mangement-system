const Joi = require("joi");

// 🔹 CREATE MEETING VALIDATOR
const meetingBookingValidator= Joi.object({
  EventId: Joi.string(), 
  Date: Joi.date(),
  Time: Joi.string(), 
  Venue: Joi.string(),
 location: Joi.string().allow('', null),
  OnlineMeetingLink:Joi.string().allow('', null),

  status: Joi.string()
})


module.exports = {
  meetingBookingValidator,

};