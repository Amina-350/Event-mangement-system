const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

  // =====================================================
  // AUTH REFERENCE
  // =====================================================
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  // =====================================================
  // PERSONAL IDENTITY
  // =======================a==============================
  firstName: String,
  middleName: String,
  lastName: String,
  displayName: String,
  username: { type: String, unique: true },

  bio: String,
  tagline: String,

  profileImage: String,
  coverImage: String,

  gender: {
    type: String,
    // enum: ["male", "female", "other", "prefer_not_to_say"]
  },

  dateOfBirth: Date,
  age: Number,

  nationality: String,
  languagesSpoken: [String],

  // =====================================================
  // CONTACT INFORMATION
  // =====================================================
  email: String,
  phone: String,
  alternatePhone: String,

  contactVisibility: {
    showEmail: { type: Boolean, default: false },
    showPhone: { type: Boolean, default: false }
  },

  // =====================================================
  // ADDRESS & LOCATION
  // =====================================================
  address: {
    country: String,
    state: String,
    city: String,
    postalCode: String,
    street: String,
    landmark: String
  },

  location: {
    latitude: Number,
    longitude: Number,
    timezone: String
  },

  // =====================================================
  // SOCIAL & ONLINE PRESENCE
  // =====================================================
  socialLinks: {
    website: String,
    linkedin: String,
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String
  },

  // =====================================================
  // ROLE & PROFESSIONAL DETAILS
  // =====================================================
  role: {
    type: String,
    enum: ["admin", "organizer", "attendee", "vendor"],
    default: "attendee"
  },

  organizationName: String,
  organizationType: {
    type: String,
    enum: ["individual", "company", "agency"]
  },

  designation: String,
  aboutOrganization: String,
  companyWebsite: String,

  experienceYears: Number,
  skills: [String],
  certifications: [String],

  // =====================================================
  // EVENT-RELATED PROFILE DATA
  // =====================================================
  eventExpertise: {
    type: [String],
    enum: ["Tech", "Music", "Corporate", "Wedding", "Sports", "Education"]
  },

  preferredEventTypes: {
    type: [String],
    enum: ["online", "physical", "hybrid"]
  },

  preferredAudienceSize: {
    type: String,
    enum: ["small", "medium", "large"]
  },

  availabilityStatus: {
    type: String,
    enum: ["available", "busy", "unavailable"],
    default: "available"
  },

  // =====================================================
  // USER PREFERENCES
  // =====================================================
  interests: [String],
  favoriteVenues: [String],

  notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: true },
    whatsapp: { type: Boolean, default: false }
  },

  languagePreference: String,
  currencyPreference: String,

  // =====================================================
  // PRIVACY & VISIBILITY
  // =====================================================
  profileVisibility: {
    type: String,
    enum: ["public", "private", "connections_only"],
    default: "public"
  },

  searchable: { type: Boolean, default: true },
  allowMessages: { type: Boolean, default: true },

  blockedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  // =====================================================
  // VERIFICATION & TRUST
  // =====================================================
  verification: {
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    profileVerified: { type: Boolean, default: false },
    verificationBadge: {
      type: String,
      enum: ["none", "basic", "verified"],
      default: "none"
    }
  },

  // =====================================================
  // AUDIT & METADATA
  // =====================================================
  isProfileComplete: { type: Boolean, default: false },
  isPublicProfile: { type: Boolean, default: true }

}, {
  timestamps: {
    createdAt: "profileCreatedAt",
    updatedAt: "profileUpdatedAt"
  }
});

module.exports = mongoose.model("Profile", profileSchema);
