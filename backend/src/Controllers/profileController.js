const Profile = require("../Model/ProfileModel");
const { uploadToCloudinary } = require("../utility/cloudinary");

const createProfile = async (req, res) => {
  try {
    console.log("the req is --->",req);
    const userId = req.user._id;

    // Handle uploaded files
    let profileImageUrl = "";
    let coverImageUrl = "";

    if (req.files) {
      if (req.files.profileImage) {
        profileImageUrl = await uploadToCloudinary(req.files.profileImage[0].path, "profiles");
      }
      if (req.files.coverImage) {
        coverImageUrl = await uploadToCloudinary(req.files.coverImage[0].path, "profiles");
      }
    }

    const profileData = {
      userId,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      displayName: req.body.displayName,
      username: req.body.username,
      bio: req.body.bio,
      tagline: req.body.tagline,
      profileImage: profileImageUrl || req.body.profileImage, // fallback to url if sent as text
      coverImage: coverImageUrl || req.body.coverImage,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
      nationality: req.body.nationality,
      languagesSpoken: req.body.languagesSpoken,
      email: req.body.email,
      phone: req.body.phone,
      alternatePhone: req.body.alternatePhone,
      contactVisibility: req.body.contactVisibility,
      address: req.body.address,
      location: req.body.location,
      socialLinks: req.body.socialLinks,
      role: req.body.role,
      organizationName: req.body.organizationName,
      organizationType: req.body.organizationType,
      designation: req.body.designation,
      aboutOrganization: req.body.aboutOrganization,
      companyWebsite: req.body.companyWebsite,
      experienceYears: req.body.experienceYears,
      skills: req.body.skills,
      certifications: req.body.certifications,
      eventExpertise: req.body.eventExpertise,
      preferredEventTypes: req.body.preferredEventTypes,
      preferredAudienceSize: req.body.preferredAudienceSize,
      availabilityStatus: req.body.availabilityStatus,
      interests: req.body.interests,
      favoriteVenues: req.body.favoriteVenues,
      notificationPreferences: req.body.notificationPreferences,
      languagePreference: req.body.languagePreference,
      currencyPreference: req.body.currencyPreference,
      profileVisibility: req.body.profileVisibility,
      searchable: req.body.searchable,
      allowMessages: req.body.allowMessages,
    };

    // Auto-calculate age
    if (req.body.dateOfBirth) {
      const ageDifMs = Date.now() - new Date(req.body.dateOfBirth).getTime();
      profileData.age = Math.floor(ageDifMs / (1000 * 60 * 60 * 24 * 365.25));
    }

    // Check if profile already exists
    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) return res.status(400).json({ message: "Profile already exists." });

    // Check username
    const existingUsername = await Profile.findOne({ username: profileData.username });
    if (existingUsername) return res.status(400).json({ message: "Username already taken." });

    // Save profile
    const profile = new Profile(profileData);
    await profile.save();

    res.status(201).json({ message: "Profile created successfully", profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createProfile };
