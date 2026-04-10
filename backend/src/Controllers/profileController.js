import { sendError, sendSuccess, uploadToCloudinary } from "../utility/index.js";
import {User} from "../Model/UserModel.js";

// Import all models
import {PersonalIdentityModelSchema} from "../Model/index.js";
import {ProfileSocialModelSchema} from "../Model/index.js";
import {PrivacyModelSchema} from "../Model/index.js";
import {ProfileAddressModelSchema} from "../Model/index.js";
import {RoleProfessionalInfoModelSchema} from "../Model/index.js";
import {EventProfileModelSchema} from "../Model/index.js";
import {UserPreferenceModelSchema} from "../Model/index.js";
import {AuditModelSchema} from "../Model/index.js";
import {ContactInformationModelSchema} from "../Model/index.js";
import {VerficationTrustModelSchema} from "../Model/index.js";
import {UserPreferenceTagModelSchema} from "../Model/index.js";
export const createProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("the id is ---->", userId);

    // Handle uploaded files
    // eslint-disable-next-line no-console
    let profileImageUrl = "";
    // eslint-disable-next-line no-console
    let coverImageUrl = "";
    if (req.files) {
      if (req.files.profileImage) {
        // eslint-disable-next-line no-console
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

    const {
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
      corporateEvents,
      socialAndPersonalEvents,
      educationalEvents,
      culturalAndEntertainment,
      sportsEvents,
      brandEvents,
    } = req.body;
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
      // eslint-disable-next-line no-console
      age: dateOfBirth
        ? Math.floor(
            (Date.now() - new Date(req.body.dateOfBirth).getTime()) /
              (1000 * 60 * 60 * 24 * 365.25),
          )
        : null,
    };
    const socialData = {
      socialLinks,
      userId,
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

    // Prepare event preferences (tags)
    const eventPreferencesData = {
      userId,
      eventPreferences: {
        corporateEvents,
        socialAndPersonalEvents,
        educationalEvents,
        culturalAndEntertainment,
        sportsEvents,
        brandEvents,
      },
    };

    // Check if profile already exists (username check)
    const existingProfile = await User.findOne({ userId });
    if (existingProfile)
      return res.status(400).json({ message: "Profile already exists." });

    // const existingUsername = await User.findOne({ username: personalIdentityData.username });
    // if (existingUsername) return res.status(400).json({ message: "Username already taken." });

    // Save all models in parallels
    await Promise.all([
      PersonalIdentityModelSchema.create(personalIdentityData),
      ProfileSocialModelSchema.create(socialData),
      PrivacyModelSchema.create(privacyData),
      ProfileAddressModelSchema.create(addressData),
      RoleProfessionalInfoModelSchema.create(roleInfoData),
      EventProfileModelSchema.create(eventProfileData),
      UserPreferenceModelSchema.create(preferencesData),
      AuditModelSchema.create(auditData),
      ContactInformationModelSchema.create(contactData),
      VerficationTrustModelSchema.create(trustData),
      UserPreferenceTagModelSchema.create(eventPreferencesData),
    ]);

    sendSuccess(res)
  } catch (error) {
    // console.error(error);
   sendError(res,error)
  }
};


