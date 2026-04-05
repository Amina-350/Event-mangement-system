const Joi = require("joi");

const createProfileSchemaValidator= Joi.object({
  // 🔹 Personal Info
  firstName: Joi.string().min(2).max(50).allow('',null),
  middleName: Joi.string().allow('',null),
  lastName: Joi.string().min(2).max(50).allow('',null),
  displayName: Joi.string().allow(""),
  username: Joi.string().alphanum().min(3).max(30).allow('',null),
  bio: Joi.string().max(500).allow('',null),
  tagline: Joi.string().max(150).allow('',null),

  gender: Joi.string().allow('',null),
  dateOfBirth: Joi.date().allow('',null),
  nationality: Joi.string().allow('',null),
  languagesSpoken: Joi.array().items(Joi.string()).allow('',null),

  // 🔹 Social
  socialLinks: Joi.array().items(
    Joi.object({
      platform: Joi.string().allow('',null),
      url: Joi.string().uri().allow('',null),
    })
  ),

  // 🔹 Privacy
  profileVisibility: Joi.string().allow('',null),
  searchable: Joi.boolean().allow('',null),
  allowMessages: Joi.boolean().allow('',null),

  // 🔹 Address
  address: Joi.string().allow('',null),
  location: Joi.string().allow('',null),

  // 🔹 Professional
  role: Joi.string().allow('',null),
  organizationName: Joi.string().allow(""),
  organizationType: Joi.string().allow(""),
  designation: Joi.string().allow(""),
  aboutOrganization: Joi.string().allow(""),
  companyWebsite: Joi.string().uri().allow(""),
  experienceYears: Joi.number().min(0).allow('',null),
  skills: Joi.array().items(Joi.string()).allow('',null),
  certifications: Joi.array().items(Joi.string()).allow('',null),

  // 🔹 Event Profile
  eventExpertise: Joi.array().items(Joi.string()).allow('',null),
  preferredEventTypes: Joi.array().items(Joi.string()).allow('',null),
  preferredAudienceSize: Joi.string().allow('',null),
  availabilityStatus: Joi.string().allow('',null),
  favoriteVenues: Joi.array().items(Joi.string()).allow('',null),

  // 🔹 Preferences
  interests: Joi.array().items(Joi.string()).allow('',null),
  notificationPreferences: Joi.object().allow('',null),
  languagePreference: Joi.string().allow('',null),
  currencyPreference: Joi.string().allow('',null),

  // 🔹 Contact
  email: Joi.string().email().allow('',null),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).allow('',null),
  alternatePhone: Joi.string().pattern(/^[0-9]{10,15}$/).allow('',null),
  contactVisibility: Joi.string().allow('',null),

  // 🔹 Verification
  emailVerified: Joi.boolean().allow('',null),
  phoneVerified: Joi.boolean().allow('',null),
  profileVerified: Joi.boolean().allow('',null),
  verificationBadge: Joi.string().allow('',null),

  // 🔹 Event Tags
  corporateEvents: Joi.boolean().allow('',null),
  socialAndPersonalEvents: Joi.boolean().allow('',null),
  educationalEvents: Joi.boolean().allow('',null),
  culturalAndEntertainment: Joi.boolean().allow('',null),
  sportsEvents: Joi.boolean().allow('',null),
  brandEvents: Joi.boolean().allow('',null),
});

module.exports = {
  createProfileSchemaValidator,
};