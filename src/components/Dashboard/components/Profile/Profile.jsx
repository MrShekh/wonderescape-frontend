import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCalendarAlt, FaMapMarkerAlt, FaPlane, FaHotel, FaCar, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import styles from './Profile.module.css';
import { useUser } from '../../../context/UserContext';

const Profile = () => {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    setEditData(user);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateUser(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(user);
    setIsEditing(false);
  };

  const renderProfileSection = () => (
    <div className={styles.profileSection}>
      <div className={styles.profileHeader}>
        <div className={styles.profileImage}>
          <FaUser />
        </div>
        <div className={styles.profileInfo}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        {!isEditing && (
          <button className={styles.editButton} onClick={() => setIsEditing(true)}>
            <FaEdit /> Edit Profile
          </button>
        )}
      </div>

      <div className={styles.profileDetails}>
        <div className={styles.detailItem}>
          <FaUser className={styles.icon} />
          <div className={styles.detailContent}>
            <label>Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
              />
            ) : (
              <p>{user.name}</p>
            )}
          </div>
        </div>

        <div className={styles.detailItem}>
          <FaEnvelope className={styles.icon} />
          <div className={styles.detailContent}>
            <label>Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
              />
            ) : (
              <p>{user.email}</p>
            )}
          </div>
        </div>

        <div className={styles.detailItem}>
          <FaPhone className={styles.icon} />
          <div className={styles.detailContent}>
            <label>Phone</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={editData.phone}
                onChange={handleInputChange}
              />
            ) : (
              <p>{user.phone}</p>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className={styles.editActions}>
          <button className={styles.saveButton} onClick={handleSave}>
            <FaSave /> Save Changes
          </button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            <FaTimes /> Cancel
          </button>
        </div>
      )}
    </div>
  );

  const renderPreferencesSection = () => (
    <div className={styles.preferencesSection}>
      <h2>Preferences</h2>
      <div className={styles.preferencesGrid}>
        <div className={styles.preferenceItem}>
          <h3>Notifications</h3>
          <div className={styles.preferenceOptions}>
            <label>
              <input
                type="checkbox"
                name="notifications"
                checked={user.preferences.notifications}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              Push Notifications
            </label>
            <label>
              <input
                type="checkbox"
                name="emailUpdates"
                checked={user.preferences.emailUpdates}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              Email Updates
            </label>
            <label>
              <input
                type="checkbox"
                name="smsUpdates"
                checked={user.preferences.smsUpdates}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              SMS Updates
            </label>
          </div>
        </div>

        <div className={styles.preferenceItem}>
          <h3>Travel Interests</h3>
          <div className={styles.interestTags}>
            {['Adventure', 'Beach', 'Cultural', 'Food', 'Nature', 'Shopping'].map(interest => (
              <span key={interest} className={styles.interestTag}>
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTravelHistory = () => (
    <div className={styles.travelHistory}>
      <h2>Travel History</h2>
      <div className={styles.historyList}>
        {user.travelHistory.length > 0 ? (
          user.travelHistory.map((trip, index) => (
            <div key={index} className={styles.historyItem}>
              <div className={styles.tripIcon}>
                {trip.type === 'flight' ? <FaPlane /> : trip.type === 'hotel' ? <FaHotel /> : <FaCar />}
              </div>
              <div className={styles.tripDetails}>
                <h3>{trip.destination}</h3>
                <p><FaCalendarAlt /> {trip.date}</p>
                <p><FaMapMarkerAlt /> {trip.location}</p>
              </div>
              <div className={styles.tripStatus}>
                <span className={styles.statusBadge}>{trip.status}</span>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noHistory}>No travel history yet</p>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileTabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'profile' ? styles.active : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'preferences' ? styles.active : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          Preferences
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'history' ? styles.active : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Travel History
        </button>
      </div>

      <div className={styles.profileContent}>
        {activeTab === 'profile' && renderProfileSection()}
        {activeTab === 'preferences' && renderPreferencesSection()}
        {activeTab === 'history' && renderTravelHistory()}
      </div>
    </div>
  );
};

export default Profile; 