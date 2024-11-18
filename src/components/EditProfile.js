import React, { useState, useContext } from "react"
import { uploadMedia, updateProfile } from "../utils/apis"
import "../css/EditProfile.css"
import { getImageUrl } from "../utils/pp"

const EditProfile = ({ userData, onClose, onUpdate }) => {
  console.log(userData)

  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    mobileno: userData?.mobileno ? userData.mobileno.toString() : "",
    password: "",
    confirmPassword: "",
  })
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [changes, setChanges] = useState({})

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (value !== userData[field]) {
      setChanges((prev) => ({
        ...prev,
        [field]: value,
      }))
    } else {
      setChanges((prev) => {
        const newChanges = { ...prev }
        delete newChanges[field]
        return newChanges
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address"
    }

    if (formData.mobileno && !/^\d{10}$/.test(formData.mobileno.replace(/[-()\s]/g, ""))) {
      newErrors.mobileno = "Invalid mobileno number"
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.password = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0]
    setPhoto(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)

    try {
      let photoUrl = null
      if (photo) {
        const photoFormData = new FormData()
        photoFormData.append("file", photo)
        const photoRes = await uploadMedia(photoFormData)

        if (photoRes.success) {
          photoUrl = photoRes.file.path
        }
      }

      const finalChanges = {
        ...changes,
        ...(photoUrl && { profile_image: photoUrl }),
      }

      const res = await updateProfile(finalChanges)

      if (res.success) {
        onUpdate()
        onClose()
      } else {
        alert(res.message)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="edit-profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="photo-upload">
            <img
              src={preview || getImageUrl(userData?.profile_image) || "profile.jpg"}
              alt="Profile"
            />
            <label className="upload-btn">
              Change Photo
              <input type="file" accept="image/*" onChange={handlePhotoChange} hidden />
            </label>
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email"
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={formData.mobileno}
              onChange={(e) => handleChange("mobileno", e.target.value)}
              placeholder="Enter your mobileno number"
              className={errors.mobileno ? "error" : ""}
            />
            {errors.mobileno && <span className="error-message">{errors.mobileno}</span>}
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Enter new password"
              className={errors.password ? "error" : ""}
            />
          </div>

          {formData.password && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                placeholder="Confirm new password"
                className={errors.password ? "error" : ""}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
          )}

          <button
            type="submit"
            className="save-btn"
            disabled={loading || (Object.keys(changes).length === 0 && !preview)}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
