import React, { useState } from "react";
import api from "../api/axios";
import "./style.css";

// Sections
const sections = [
  "personal",
  "contact",
  "address",
  "location",
  "social",
  "professional",
  "event",
  "preferences",
  "privacy",
];

// Enum options
const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
  { label: "Prefer Not to Say", value: "prefer_not_to_say" },
];

const roleOptions = [
  { label: "Attendee", value: "attendee" },
  { label: "Organizer", value: "organizer" },
  { label: "Vendor", value: "vendor" },
  { label: "Admin", value: "admin" },
];

const organizationTypeOptions = [
  { label: "Individual", value: "individual" },
  { label: "Company", value: "company" },
  { label: "Agency", value: "agency" },
];

const eventExpertiseOptions = [
  "Tech",
  "Music",
  "Corporate",
  "Wedding",
  "Sports",
  "Education",
];

const preferredEventTypesOptions = ["online", "physical", "hybrid"];

const preferredAudienceSizeOptions = ["small", "medium", "large"];

const availabilityStatusOptions = ["available", "busy", "unavailable"];

const profileVisibilityOptions = ["public", "private", "connections_only"];

const ProfileForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    displayName: "",
    username: "",
    bio: "",
    tagline: "",
    profileImage: null,
    coverImage: null,
    gender: "",
    dateOfBirth: "",
    nationality: "",
    languagesSpoken: [],
    email: "",
    phone: "",
    alternatePhone: "",
    contactVisibility: { showEmail: false, showPhone: false },
    address: {
      country: "",
      state: "",
      city: "",
      postalCode: "",
      street: "",
      landmark: "",
    },
    location: { latitude: "", longitude: "", timezone: "" },
    socialLinks: {
      website: "",
      linkedin: "",
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
    },
    role: "attendee",
    organizationName: "",
    organizationType: "",
    designation: "",
    aboutOrganization: "",
    companyWebsite: "",
    experienceYears: "",
    skills: [],
    certifications: [],
    eventExpertise: [],
    preferredEventTypes: [],
    preferredAudienceSize: "",
    availabilityStatus: "available",
    interests: [],
    favoriteVenues: [],
    notificationPreferences: {
      email: true,
      sms: false,
      push: true,
      whatsapp: false,
    },
    languagePreference: "",
    currencyPreference: "",
    profileVisibility: "public",
    searchable: true,
    allowMessages: true,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle nested and normal fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const keys = name.split(".");
      setFormData((prev) => {
        const copy = { ...prev };
        copy[keys[0]][keys[1]] = type === "checkbox" ? checked : value;
        return copy;
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Handle array fields from multi-select
  const handleArrayChange = (e, field) => {
    const options = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value,
    );
    setFormData((prev) => ({ ...prev, [field]: options }));
  };

  const nextSection = () =>
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
  const prevSection = () => setCurrentSection((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic frontend validation for enums
    if (!formData.organizationType) {
      setError("Please select organization type");
      return;
    }
    if (!formData.eventExpertise.length) {
      setError("Please select at least one event expertise");
      return;
    }
    if (!formData.preferredEventTypes.length) {
      setError("Please select at least one preferred event type");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        if (Array.isArray(value)) {
          // send array as multiple fields
          value.forEach((item) => data.append(key, item));
        } else if (typeof value === "object" && value !== null) {
          // Only stringify **nested objects**, not enums
          if (
            !(
              key === "gender" ||
              key === "role" ||
              key === "organizationType" ||
              key === "preferredAudienceSize" ||
              key === "availabilityStatus" ||
              key === "profileVisibility"
            )
          ) {
            data.append(key, JSON.stringify(value));
          } else {
            data.append(key, value); // send enum strings as is
          }
        } else if (value !== null && value !== undefined) {
          data.append(key, value);
        }
      });

      if (formData.profileImage)
        data.append("profileImage", formData.profileImage);
      if (formData.coverImage) data.append("coverImage", formData.coverImage);

      const token = localStorage.getItem("token");
      const res = await api.post("/Profile/createProfile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Profile created successfully!");
      console.log(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const renderSection = () => {
    switch (sections[currentSection]) {
      case "personal":
        return (
          <>
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              name="middleName"
              placeholder="Middle Name"
              value={formData.middleName}
              onChange={handleChange}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              name="displayName"
              placeholder="Display Name"
              value={formData.displayName}
              onChange={handleChange}
            />
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
            />
            <input
              name="tagline"
              placeholder="Tagline"
              value={formData.tagline}
              onChange={handleChange}
            />
            <input
              type="file"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  profileImage: e.target.files[0],
                }))
              }
            />
            <input
              type="file"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  coverImage: e.target.files[0],
                }))
              }
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              {genderOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            <input
              name="nationality"
              placeholder="Nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
            <input
              name="languagesSpoken"
              placeholder="Languages (comma separated)"
              value={formData.languagesSpoken.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  languagesSpoken: e.target.value
                    .split(",")
                    .map((l) => l.trim()),
                }))
              }
            />
          </>
        );

      case "contact":
        return (
          <>
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              name="alternatePhone"
              placeholder="Alternate Phone"
              value={formData.alternatePhone}
              onChange={handleChange}
            />
            <label>
              Show Email
              <input
                type="checkbox"
                checked={formData.contactVisibility.showEmail}
                name="contactVisibility.showEmail"
                onChange={handleChange}
              />
            </label>
            <label>
              Show Phone
              <input
                type="checkbox"
                checked={formData.contactVisibility.showPhone}
                name="contactVisibility.showPhone"
                onChange={handleChange}
              />
            </label>
          </>
        );

      case "address":
        return (
          <>
            <input
              name="address.country"
              placeholder="Country"
              value={formData.address.country}
              onChange={handleChange}
            />
            <input
              name="address.state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleChange}
            />
            <input
              name="address.city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleChange}
            />
            <input
              name="address.postalCode"
              placeholder="Postal Code"
              value={formData.address.postalCode}
              onChange={handleChange}
            />
            <input
              name="address.street"
              placeholder="Street"
              value={formData.address.street}
              onChange={handleChange}
            />
            <input
              name="address.landmark"
              placeholder="Landmark"
              value={formData.address.landmark}
              onChange={handleChange}
            />
          </>
        );

      case "location":
        return (
          <>
            <input
              name="location.latitude"
              placeholder="Latitude"
              value={formData.location.latitude}
              onChange={handleChange}
            />
            <input
              name="location.longitude"
              placeholder="Longitude"
              value={formData.location.longitude}
              onChange={handleChange}
            />
            <input
              name="location.timezone"
              placeholder="Timezone"
              value={formData.location.timezone}
              onChange={handleChange}
            />
          </>
        );

      case "social":
        return (
          <>
            {Object.keys(formData.socialLinks).map((link) => (
              <input
                key={link}
                name={`socialLinks.${link}`}
                placeholder={link}
                value={formData.socialLinks[link]}
                onChange={handleChange}
              />
            ))}
          </>
        );

      case "professional":
        return (
          <>
            <select name="role" value={formData.role} onChange={handleChange}>
              {roleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <input
              name="organizationName"
              placeholder="Organization Name"
              value={formData.organizationName}
              onChange={handleChange}
            />

            <select
              name="organizationType"
              value={formData.organizationType}
              onChange={handleChange}
            >
              <option value="">Select Organization Type</option>
              {organizationTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <input
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
            />
            <input
              name="aboutOrganization"
              placeholder="About Organization"
              value={formData.aboutOrganization}
              onChange={handleChange}
            />
            <input
              name="companyWebsite"
              placeholder="Company Website"
              value={formData.companyWebsite}
              onChange={handleChange}
            />
            <input
              name="experienceYears"
              placeholder="Experience Years"
              value={formData.experienceYears}
              onChange={handleChange}
            />
            <input
              name="skills"
              placeholder="Skills (comma separated)"
              value={formData.skills.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  skills: e.target.value.split(",").map((s) => s.trim()),
                }))
              }
            />
            <input
              name="certifications"
              placeholder="Certifications (comma separated)"
              value={formData.certifications.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  certifications: e.target.value
                    .split(",")
                    .map((s) => s.trim()),
                }))
              }
            />
          </>
        );

      case "event":
        return (
          <>
            <label>Event Expertise</label>
            <select
              multiple
              value={formData.eventExpertise}
              onChange={(e) => handleArrayChange(e, "eventExpertise")}
            >
              {eventExpertiseOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <label>Preferred Event Types</label>
            <select
              multiple
              value={formData.preferredEventTypes}
              onChange={(e) => handleArrayChange(e, "preferredEventTypes")}
            >
              {preferredEventTypesOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <select
              name="preferredAudienceSize"
              value={formData.preferredAudienceSize}
              onChange={handleChange}
            >
              <option value="">Preferred Audience Size</option>
              {preferredAudienceSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <select
              name="availabilityStatus"
              value={formData.availabilityStatus}
              onChange={handleChange}
            >
              {availabilityStatusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </>
        );

      case "preferences":
        return (
          <>
            <input
              name="interests"
              placeholder="Interests (comma separated)"
              value={formData.interests.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  interests: e.target.value.split(",").map((i) => i.trim()),
                }))
              }
            />
            <input
              name="favoriteVenues"
              placeholder="Favorite Venues (comma separated)"
              value={formData.favoriteVenues.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  favoriteVenues: e.target.value
                    .split(",")
                    .map((i) => i.trim()),
                }))
              }
            />

            <label>
              Email Notifications
              <input
                type="checkbox"
                checked={formData.notificationPreferences.email}
                name="notificationPreferences.email"
                onChange={handleChange}
              />
            </label>
            <label>
              SMS Notifications
              <input
                type="checkbox"
                checked={formData.notificationPreferences.sms}
                name="notificationPreferences.sms"
                onChange={handleChange}
              />
            </label>
            <label>
              Push Notifications
              <input
                type="checkbox"
                checked={formData.notificationPreferences.push}
                name="notificationPreferences.push"
                onChange={handleChange}
              />
            </label>
            <label>
              WhatsApp Notifications
              <input
                type="checkbox"
                checked={formData.notificationPreferences.whatsapp}
                name="notificationPreferences.whatsapp"
                onChange={handleChange}
              />
            </label>

            <input
              name="languagePreference"
              placeholder="Language Preference"
              value={formData.languagePreference}
              onChange={handleChange}
            />
            <input
              name="currencyPreference"
              placeholder="Currency Preference"
              value={formData.currencyPreference}
              onChange={handleChange}
            />
          </>
        );

      case "privacy":
        return (
          <>
            <select
              name="profileVisibility"
              value={formData.profileVisibility}
              onChange={handleChange}
            >
              {profileVisibilityOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <label>
              Searchable
              <input
                type="checkbox"
                checked={formData.searchable}
                name="searchable"
                onChange={handleChange}
              />
            </label>
            <label>
              Allow Messages
              <input
                type="checkbox"
                checked={formData.allowMessages}
                name="allowMessages"
                onChange={handleChange}
              />
            </label>
          </>
        );

      default:
        return <p>Section not implemented</p>;
    }
  };

  return (
    <div className="registration-container">
      <h2>Create Profile</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        {renderSection()}

        <div style={{ marginTop: "20px" }}>
          {currentSection > 0 && (
            <button type="button" onClick={prevSection}>
              Back
            </button>
          )}
          {currentSection < sections.length - 1 && (
            <button type="button" onClick={nextSection}>
              Next
            </button>
          )}
          {currentSection === sections.length - 1 && (
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Submit"}
            </button>
          )}
        </div>

        <p>
          Step {currentSection + 1} of {sections.length}
        </p>
      </form>
    </div>
  );
};

export default ProfileForm;
