const { uploadToCloudinary } = require("../utility/cloudinary");
const User = require("../Model/UserModel");
// Import all models
const PersonalIdentityModel = require("../Model/ProfileModels/PersonalIdentityModel");
const ProfileSocialModel = require("../Model/ProfileModels/SocialLink");
const PrivacyModel = require("../Model/ProfileModels/PrivacyModel");
const ProfileAddressModel = require("../Model/ProfileModels/ProfileAddressModel");
const RoleProfessionalInfoModel = require("../Model/ProfileModels/RoleAndProfessionalInfoModel");
const EventProfileModel = require("../Model/ProfileModels/EventProfileModel");
const UserPreferenceModel = require("../Model/ProfileModels/UserPreferenceModel");
const AuditModel = require("../Model/ProfileModels/AuditModel");
const ContactInformationModel = require("../Model/ProfileModels/ContactInformationModel");
const VerficationTrustModel = require("../Model/ProfileModels/VerficationTrustModel");

const createProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("the id is ---->", userId);

    // Handle uploaded files
    let profileImageUrl = "";
    let coverImageUrl = "";
    if (req.files) {
      if (req.files.profileImage) {
        profileImageUrl = await uploadToCloudinary(
          req.files.profileImage[0].path,
          "profiles",
        );
      }
      if (req.files.coverImage) {
        coverImageUrl = await uploadToCloudinary(
          req.files.coverImage[0].path,
          "profiles",
        );
      }
    }


    const{
   
      firstName,
      middleName,
      lastName,
      displayName,
      username,
      bio,
      tagline,
      profileImage,
      coverImage,
      gender,
      dateOfBirth,
      nationality,
      languagesSpoken,
      age,
      socialLinks,
        profileVisibility,
      searchable,
      allowMessages,
          address,
      location,

 role,
      organizationName,
      organizationType,
      designation,
      aboutOrganization,
      companyWebsite,
      experienceYears,
      skills,
      certifications,
        eventExpertise,
      preferredEventTypes,
      preferredAudienceSize,
      availabilityStatus,
      favoriteVenues,
      
        interests,
      notificationPreferences,
      languagePreference,
      currencyPreference,

         email,
      phone,
      alternatePhone,
      contactVisibility,

        
    emailVerified,
    phoneVerified,
    profileVerified,
    verificationBadge,
  
    }=req.body;
    // Prepare data for each model
    const personalIdentityData = {
      userId,
      firstName,
      middleName,
      lastName,
      displayName,
      username,
      bio,
      tagline,
      profileImage,
      coverImage,
      gender,
      dateOfBirth,
      nationality,
      languagesSpoken,
      age:dateOfBirth
        ? Math.floor(
            (Date.now() - new Date(req.body.dateOfBirth).getTime()) /
              (1000 * 60 * 60 * 24 * 365.25),
          )
        : null,
    };

    const socialData = {
      userId,
      socialLinks,
    };

    const privacyData = {
      userId,
      profileVisibility,
      searchable,
      allowMessages,
    };

    const addressData = {
      userId,
      address,
      location,
    };

    const roleInfoData = {
      userId,
      role,
      organizationName,
      organizationType,
      designation,
      aboutOrganization,
      companyWebsite,
      experienceYears,
      skills,
      certifications,
    };

    const eventProfileData = {
      userId,
      eventExpertise,
      preferredEventTypes,
      preferredAudienceSize,
      availabilityStatus,
      favoriteVenues,
    };

    const preferencesData = {
      userId,
      interests,
      notificationPreferences,
      languagePreference,
      currencyPreference,
    };

    const auditData = {
      userId,
      isProfileComplete: false,
      isPublicProfile: true,
    };
    const contactData = {
      userId,
      email,
      phone,
      alternatePhone,
      contactVisibility,
    };
   const trustData = {
  userId,

    emailVerified,
    phoneVerified,
    profileVerified,
    verificationBadge,
  
};


    // Check if profile already exists (username check)
    const existingProfile = await User.findOne({ userId });
    if (existingProfile)
      return res.status(400).json({ message: "Profile already exists." });

    // const existingUsername = await User.findOne({ username: personalIdentityData.username });
    // if (existingUsername) return res.status(400).json({ message: "Username already taken." });

    // Save all models in parallel
    await Promise.all([
      PersonalIdentityModel.create(personalIdentityData),
      ProfileSocialModel.create(socialData),
      PrivacyModel.create(privacyData),
      ProfileAddressModel.create(addressData),
      RoleProfessionalInfoModel.create(roleInfoData),
      EventProfileModel.create(eventProfileData),
      UserPreferenceModel.create(preferencesData),
      AuditModel.create(auditData),
      ContactInformationModel.create(contactData),
      VerficationTrustModel.create(trustData),
    ]);

    res.status(201).json({ message: "Full profile created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createProfile: createProfile };
