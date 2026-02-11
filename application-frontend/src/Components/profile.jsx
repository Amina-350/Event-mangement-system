import React, { useState } from "react";
import api from "../api/axios";
import "./style.css";

/* =======================
   CONSTANTS
======================= */
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

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
  { label: "Prefer Not to Say", value: "prefer_not_to_say" },
];

const roleOptions = ["attendee", "organizer", "vendor", "admin"];
const organizationTypeOptions = ["individual", "company", "agency"];
const eventExpertiseOptions = ["Tech", "Music", "Corporate", "Wedding", "Sports", "Education"];
const preferredEventTypesOptions = ["online", "physical", "hybrid"];
const preferredAudienceSizeOptions = ["small", "medium", "large"];
const availabilityStatusOptions = ["available", "busy", "unavailable"];
const profileVisibilityOptions = ["public", "private", "connections_only"];

/* =======================
   INITIAL STATE
======================= */
const initialState = {
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

  address: { country: "", state: "", city: "", postalCode: "", street: "", landmark: "" },
  location: { latitude: "", longitude: "", timezone: "" },
  socialLinks: { website: "", linkedin: "", facebook: "", instagram: "", twitter: "", youtube: "" },

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

  notificationPreferences: { email: true, sms: false, push: true, whatsapp: false },
  languagePreference: "",
  currencyPreference: "",

  profileVisibility: "public",
  searchable: true,
  allowMessages: true,
};

/* =======================
   COMPONENT
======================= */
const ProfileForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =======================
     HANDLERS
  ======================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: type === "checkbox" ? checked : value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleArrayChange = (e, field) => {
    const values = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setFormData((prev) => ({ ...prev, [field]: values }));
  };

  const next = () => setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
  const back = () => setCurrentSection((prev) => Math.max(prev - 1, 0));

  /* =======================
     SUBMIT
  ======================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Frontend enum validation
    if (!formData.role) return setError("Role is required");
    if (!formData.organizationType) return setError("Organization Type is required");
    if (!formData.eventExpertise.length) return setError("Select at least one event expertise");
    if (!formData.preferredEventTypes.length) return setError("Select preferred event types");

    try {
      setLoading(true);
      const fd = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        if (Array.isArray(value)) {
          value.forEach((v) => fd.append(key, v));
        } else if (typeof value === "object" && !(value instanceof File)) {
          fd.append(key, JSON.stringify(value));
        } else {
          fd.append(key, value);
        }
      });

      if (formData.profileImage) fd.append("profileImage", formData.profileImage);
      if (formData.coverImage) fd.append("coverImage", formData.coverImage);

      const token = localStorage.getItem("token");

      await api.post("/Profile/createProfile", fd, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setSuccess("Profile created successfully 🎉");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     RENDER SECTIONS
  ======================= */
  const renderSection = () => {
    switch (sections[currentSection]) {
      case "personal":
        return (
          <>
            <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} />
            <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            <input name="displayName" placeholder="Display Name" value={formData.displayName} onChange={handleChange} />
            <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} />
            <input name="tagline" placeholder="Tagline" value={formData.tagline} onChange={handleChange} />
            <input type="file" onChange={(e) => setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }))} />
            <input type="file" onChange={(e) => setFormData((prev) => ({ ...prev, coverImage: e.target.files[0] }))} />
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              {genderOptions.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            <input name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} />
            <input
              name="languagesSpoken"
              placeholder="Languages (comma separated)"
              value={formData.languagesSpoken.join(", ")}
              onChange={(e) => setFormData((prev) => ({ ...prev, languagesSpoken: e.target.value.split(",").map((l) => l.trim()) }))}
            />
          </>
        );

      case "contact":
        return (
          <>
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            <input name="alternatePhone" placeholder="Alternate Phone" value={formData.alternatePhone} onChange={handleChange} />
            <label>
              Show Email
              <input type="checkbox" checked={formData.contactVisibility.showEmail} name="contactVisibility.showEmail" onChange={handleChange} />
            </label>
            <label>
              Show Phone
              <input type="checkbox" checked={formData.contactVisibility.showPhone} name="contactVisibility.showPhone" onChange={handleChange} />
            </label>
          </>
        );

      case "address":
        return (
          <>
            <input name="address.country" placeholder="Country" value={formData.address.country} onChange={handleChange} />
            <input name="address.state" placeholder="State" value={formData.address.state} onChange={handleChange} />
            <input name="address.city" placeholder="City" value={formData.address.city} onChange={handleChange} />
            <input name="address.postalCode" placeholder="Postal Code" value={formData.address.postalCode} onChange={handleChange} />
            <input name="address.street" placeholder="Street" value={formData.address.street} onChange={handleChange} />
            <input name="address.landmark" placeholder="Landmark" value={formData.address.landmark} onChange={handleChange} />
          </>
        );

      case "location":
        return (
          <>
            <input name="location.latitude" placeholder="Latitude" value={formData.location.latitude} onChange={handleChange} />
            <input name="location.longitude" placeholder="Longitude" value={formData.location.longitude} onChange={handleChange} />
            <input name="location.timezone" placeholder="Timezone" value={formData.location.timezone} onChange={handleChange} />
          </>
        );

      case "social":
        return (
          <>
            {Object.keys(formData.socialLinks).map((link) => (
              <input key={link} name={`socialLinks.${link}`} placeholder={link} value={formData.socialLinks[link]} onChange={handleChange} />
            ))}
          </>
        );

      case "professional":
        return (
          <>
            <select name="role" value={formData.role} onChange={handleChange}>
              {roleOptions.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <input name="organizationName" placeholder="Organization Name" value={formData.organizationName} onChange={handleChange} />
            <select name="organizationType" value={formData.organizationType} onChange={handleChange}>
              <option value="">Select Organization Type</option>
              {organizationTypeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} />
            <input name="aboutOrganization" placeholder="About Organization" value={formData.aboutOrganization} onChange={handleChange} />
            <input name="companyWebsite" placeholder="Company Website" value={formData.companyWebsite} onChange={handleChange} />
            <input name="experienceYears" placeholder="Experience Years" value={formData.experienceYears} onChange={handleChange} />
            <input name="skills" placeholder="Skills (comma separated)" value={formData.skills.join(", ")} onChange={(e) => setFormData((prev) => ({ ...prev, skills: e.target.value.split(",").map((s) => s.trim()) }))} />
            <input name="certifications" placeholder="Certifications (comma separated)" value={formData.certifications.join(", ")} onChange={(e) => setFormData((prev) => ({ ...prev, certifications: e.target.value.split(",").map((s) => s.trim()) }))} />
          </>
        );

      case "event":
        return (
          <>
            <label>Event Expertise</label>
            <select multiple value={formData.eventExpertise} onChange={(e) => handleArrayChange(e, "eventExpertise")}>
              {eventExpertiseOptions.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
            <label>Preferred Event Types</label>
            <select multiple value={formData.preferredEventTypes} onChange={(e) => handleArrayChange(e, "preferredEventTypes")}>
              {preferredEventTypesOptions.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
            <select name="preferredAudienceSize" value={formData.preferredAudienceSize} onChange={handleChange}>
              <option value="">Preferred Audience Size</option>
              {preferredAudienceSizeOptions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <select name="availabilityStatus" value={formData.availabilityStatus} onChange={handleChange}>
              {availabilityStatusOptions.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </>
        );

      case "preferences":
        return (
          <>
            <input name="interests" placeholder="Interests (comma separated)" value={formData.interests.join(", ")} onChange={(e) => setFormData((prev) => ({ ...prev, interests: e.target.value.split(",").map((i) => i.trim()) }))}
            />
            <input name="favoriteVenues" placeholder="Favorite Venues (comma separated)" value={formData.favoriteVenues.join(", ")} onChange={(e) => setFormData((prev) => ({ ...prev, favoriteVenues: e.target.value.split(",").map((i) => i.trim()) }))}
            />
            <label>Email Notifications
              <input type="checkbox" checked={formData.notificationPreferences.email} name="notificationPreferences.email" onChange={handleChange} />
            </label>
            <label>SMS Notifications
              <input type="checkbox" checked={formData.notificationPreferences.sms} name="notificationPreferences.sms" onChange={handleChange} />
            </label>
            <label>Push Notifications
              <input type="checkbox" checked={formData.notificationPreferences.push} name="notificationPreferences.push" onChange={handleChange} />
            </label>
            <label>WhatsApp Notifications
              <input type="checkbox" checked={formData.notificationPreferences.whatsapp} name="notificationPreferences.whatsapp" onChange={handleChange} />
            </label>
            <input name="languagePreference" placeholder="Language Preference" value={formData.languagePreference} onChange={handleChange} />
            <input name="currencyPreference" placeholder="Currency Preference" value={formData.currencyPreference} onChange={handleChange} />
          </>
        );

      case "privacy":
        return (
          <>
            <select name="profileVisibility" value={formData.profileVisibility} onChange={handleChange}>
              {profileVisibilityOptions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <label>Searchable
              <input type="checkbox" checked={formData.searchable} name="searchable" onChange={handleChange} />
            </label>
            <label>Allow Messages
              <input type="checkbox" checked={formData.allowMessages} name="allowMessages" onChange={handleChange} />
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
  <div className="form-card">
    <h3 className="section-title">
      {sections[currentSection].toUpperCase()}
    </h3>

    <div className="form-grid">
      {renderSection()}
    </div>
  </div>

  <div className="form-actions">
    {currentSection > 0 && (
      <button type="button" className="btn secondary" onClick={back}>
        Back
      </button>
    )}

    {currentSection < sections.length - 1 && (
      <button type="button" className="btn primary" onClick={next}>
        Next
      </button>
    )}

    {currentSection === sections.length - 1 && (
      <button type="submit" className="btn success" disabled={loading}>
        {loading ? "Saving..." : "Submit"}
      </button>
    )}
  </div>

  <p className="step-indicator">
    Step {currentSection + 1} of {sections.length}
  </p>
</form>

    </div>
  );
};

export default ProfileForm;
