import React, { useState, useRef } from 'react';
import styles from './Profile.module.css';
import { MdVerified, MdEdit, MdSave, MdClose, MdCloudUpload } from 'react-icons/md';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('https://example.com/profile-image.jpg');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({
    // Personal details
    fullName: 'Jhnavi Sharma',
    dateOfBirth: 'January 1, 1987',
    gender: 'Female',
    nationality: 'Indian',
    address: 'Kolkata - India',
    phoneNumber: '8888888888',
    email: 'jhanvi@gmail.com',
    
    // Account Details
    displayName: 's_wilson_168920',
    accountCreated: 'March 20, 2020',
    lastLogin: 'August 22, 2024',
    membershipStatus: 'Premium Member',
    accountVerification: 'Verified',
    languagePreference: 'English',
    timeZone: 'GMT-5 (Eastern Time)',
    
    // Security Settings
    passwordLastChanged: 'July 15, 2024',
    twoFactorAuth: 'Enabled',
    securityQuestions: 'Yes',
    loginNotifications: 'Enabled',
    connectedDevices: '3 Devices',
    recentActivity: 'No Suspicious Activity Detected',
    
    // Preferences
    emailNotifications: 'Subscribed',
    smsAlerts: 'Enabled',
    contentPreferences: 'Technology, Design, Innovation',
    defaultDashboardView: 'Compact Mode',
    darkMode: 'Activated',
    languageForContent: 'English'
  });

  const [editedData, setEditedData] = useState({});

  const handleEdit = () => {
    setEditedData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
    // Here you would typically make an API call to save the changes
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create a preview URL
    const imageUrl = URL.createObjectURL(file);
    
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Update profile image after "upload" is complete
    setTimeout(() => {
      setProfileImage(imageUrl);
      setUploadProgress(0);
    }, 1200);

    // Here you would typically upload the file to your server
    // const formData = new FormData();
    // formData.append('image', file);
    // await uploadImageToServer(formData);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.profileImageContainer} onClick={handleImageClick}>
          <div className={styles.profileImage}>
            <img src={profileImage} alt="Profile" />
          </div>
          <div className={styles.uploadOverlay}>
            <MdCloudUpload className={styles.uploadIcon} />
            <span className={styles.uploadText}>Change Photo</span>
          </div>
          {uploadProgress > 0 && (
            <div className={styles.uploadProgress}>
              <div 
                className={styles.uploadProgressBar} 
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className={styles.imageInput}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className={styles.profileInfo}>
          <h1>
            {profileData.fullName}
            <MdVerified className={styles.verifiedIcon} />
          </h1>
          <p>{profileData.email}</p>
          {!isEditing && (
            <button className={styles.editButton} onClick={handleEdit}>
              <MdEdit /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.section}>
          <h2>Personal details</h2>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <label>Full name:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                />
              ) : (
                <p>{profileData.fullName}</p>
              )}
            </div>
            <div className={styles.detailItem}>
              <label>Date of Birth:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                />
              ) : (
                <p>{profileData.dateOfBirth}</p>
              )}
            </div>
            <div className={styles.detailItem}>
              <label>Gender:</label>
              {isEditing ? (
                <select
                  value={editedData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p>{profileData.gender}</p>
              )}
            </div>
            <div className={styles.detailItem}>
              <label>Nationality:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.nationality}
                  onChange={(e) => handleChange('nationality', e.target.value)}
                />
              ) : (
                <p>{profileData.nationality}</p>
              )}
            </div>
            <div className={styles.detailItem}>
              <label>Address:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
              ) : (
                <p>{profileData.address}</p>
              )}
            </div>
            <div className={styles.detailItem}>
              <label>Phone Number:</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                />
              ) : (
                <p>{profileData.phoneNumber}</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Account Details</h2>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <label>Display Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.displayName}
                  onChange={(e) => handleChange('displayName', e.target.value)}
                />
              ) : (
                <p>{profileData.displayName}</p>
              )}
            </div>
            <div className={styles.detailItem}>
              <label>Account Created:</label>
              <p>{profileData.accountCreated}</p>
            </div>
            <div className={styles.detailItem}>
              <label>Last Login:</label>
              <p>{profileData.lastLogin}</p>
            </div>
            <div className={styles.detailItem}>
              <label>Membership Status:</label>
              <p className={styles.premium}>{profileData.membershipStatus}</p>
            </div>
            <div className={styles.detailItem}>
              <label>Account Verification:</label>
              <p className={styles.verified}>
                {profileData.accountVerification}
                <MdVerified className={styles.verifiedIcon} />
              </p>
            </div>
            <div className={styles.detailItem}>
              <label>Language Preference:</label>
              {isEditing ? (
                <select
                  value={editedData.languagePreference}
                  onChange={(e) => handleChange('languagePreference', e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              ) : (
                <p>{profileData.languagePreference}</p>
              )}
            </div>
            <div className={styles.detailItem}>
              <label>Time Zone:</label>
              {isEditing ? (
                <select
                  value={editedData.timeZone}
                  onChange={(e) => handleChange('timeZone', e.target.value)}
                >
                  <option value="GMT-5 (Eastern Time)">GMT-5 (Eastern Time)</option>
                  <option value="GMT-6 (Central Time)">GMT-6 (Central Time)</option>
                  <option value="GMT-7 (Mountain Time)">GMT-7 (Mountain Time)</option>
                  <option value="GMT-8 (Pacific Time)">GMT-8 (Pacific Time)</option>
                </select>
              ) : (
                <p>{profileData.timeZone}</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Security Settings</h2>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <label>Password Last Changed:</label>
              <p>{profileData.passwordLastChanged}</p>
            </div>
            <div className={styles.detailItem}>
              <label>Two-Factor Authentication:</label>
              {isEditing ? (
                <select
                  value={editedData.twoFactorAuth}
                  onChange={(e) => handleChange('twoFactorAuth', e.target.value)}
                >
                  <option value="Enabled">Enabled</option>
                  <option value="Disabled">Disabled</option>
                </select>
              ) : (
                <p className={styles.enabled}>{profileData.twoFactorAuth}</p>
              )}
            </div>
            <div className={styles.detailItem}>
              <label>Security Questions Set:</label>
              <p>{profileData.securityQuestions}</p>
            </div>
            <div className={styles.detailItem}>
              <label>Login Notifications:</label>
              {isEditing ? (
                <select
                  value={editedData.loginNotifications}
                  onChange={(e) => handleChange('loginNotifications', e.target.value)}
                >
                  <option value="Enabled">Enabled</option>
                  <option value="Disabled">Disabled</option>
                </select>
              ) : (
                <p className={styles.enabled}>{profileData.loginNotifications}</p>
              )}
            </div>
            <div className={styles.detailItem}>
              <label>Connected Devices:</label>
              <p>{profileData.connectedDevices}</p>
            </div>
            <div className={styles.detailItem}>
              <label>Recent Account Activity:</label>
              <p>{profileData.recentActivity}</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Preferences</h2>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <label>Email Notifications:</label>
              {isEditing ? (
                <select
                  value={editedData.emailNotifications}
                  onChange={(e) => handleChange('emailNotifications', e.target.value)}
                >
                  <option value="Subscribed">Subscribed</option>
                  <option value="Unsubscribed">Unsubscribed</option>
                </select>
              ) : (
                <p className={styles.subscribed}>{profileData.emailNotifications}</p>
              )}
            </div>
            <div className={styles.detailItem}>
              <label>SMS Alerts:</label>
              {isEditing ? (
                <select
                  value={editedData.smsAlerts}
                  onChange={(e) => handleChange('smsAlerts', e.target.value)}
                >
                  <option value="Enabled">Enabled</option>
                  <option value="Disabled">Disabled</option>
                </select>
              ) : (
                <p className={styles.enabled}>{profileData.smsAlerts}</p>
              )}
            </div>
            <div className={styles.detailItem}>
              <label>Content Preferences:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.contentPreferences}
                  onChange={(e) => handleChange('contentPreferences', e.target.value)}
                />
              ) : (
                <p>{profileData.contentPreferences}</p>
              )}
            </div>
            <div className={styles.detailItem}>
              <label>Default Dashboard View:</label>
              {isEditing ? (
                <select
                  value={editedData.defaultDashboardView}
                  onChange={(e) => handleChange('defaultDashboardView', e.target.value)}
                >
                  <option value="Compact Mode">Compact Mode</option>
                  <option value="Expanded Mode">Expanded Mode</option>
                </select>
              ) : (
                <p>{profileData.defaultDashboardView}</p>
              )}
            </div>
            <div className={styles.detailItem}>
              <label>Dark Mode:</label>
              {isEditing ? (
                <select
                  value={editedData.darkMode}
                  onChange={(e) => handleChange('darkMode', e.target.value)}
                >
                  <option value="Activated">Activated</option>
                  <option value="Deactivated">Deactivated</option>
                </select>
              ) : (
                <p>{profileData.darkMode}</p>
              )}
            </div>
            <div className={styles.detailItem}>
              <label>Language for Content:</label>
              {isEditing ? (
                <select
                  value={editedData.languageForContent}
                  onChange={(e) => handleChange('languageForContent', e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              ) : (
                <p>{profileData.languageForContent}</p>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className={styles.editActions}>
            <button className={styles.cancelButton} onClick={handleCancel}>
              <MdClose /> Cancel
            </button>
            <button className={styles.saveButton} onClick={handleSave}>
              <MdSave /> Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 