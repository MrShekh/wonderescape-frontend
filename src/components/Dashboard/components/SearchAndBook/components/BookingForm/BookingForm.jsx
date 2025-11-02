import React, { useState } from 'react';
import styles from './BookingForm.module.css';
import { FaCalendarAlt, FaUser, FaMapMarkerAlt, FaPlane, FaHotel, FaCar, FaUtensils } from 'react-icons/fa';

const BookingForm = ({ selectedRoute, selectedBundle }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    travelDate: '',
    returnDate: '',
    travelers: 1,
    preferences: {
      meal: 'no-preference',
      seat: 'no-preference',
      accommodation: 'standard'
    },
    specialRequests: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.bookingFormContainer}>
      <div className={styles.formHeader}>
        <h2>Complete Your Booking</h2>
        <p>Please fill in the details to confirm your reservation</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.bookingForm}>
        {/* Personal Information */}
        <div className={styles.formSection}>
          <h3>Personal Information</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Travel Details */}
        <div className={styles.formSection}>
          <h3>Travel Details</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="travelDate">
                <FaCalendarAlt /> Departure Date
              </label>
              <input
                type="date"
                id="travelDate"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="returnDate">
                <FaCalendarAlt /> Return Date
              </label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="travelers">
                <FaUser /> Number of Travelers
              </label>
              <input
                type="number"
                id="travelers"
                name="travelers"
                min="1"
                max="10"
                value={formData.travelers}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className={styles.formSection}>
          <h3>Travel Preferences</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="preferences.meal">
                <FaUtensils /> Meal Preference
              </label>
              <select
                id="preferences.meal"
                name="preferences.meal"
                value={formData.preferences.meal}
                onChange={handleInputChange}
              >
                <option value="no-preference">No Preference</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="halal">Halal</option>
                <option value="kosher">Kosher</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="preferences.seat">
                <FaPlane /> Seat Preference
              </label>
              <select
                id="preferences.seat"
                name="preferences.seat"
                value={formData.preferences.seat}
                onChange={handleInputChange}
              >
                <option value="no-preference">No Preference</option>
                <option value="window">Window</option>
                <option value="aisle">Aisle</option>
                <option value="extra-legroom">Extra Legroom</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="preferences.accommodation">
                <FaHotel /> Accommodation Type
              </label>
              <select
                id="preferences.accommodation"
                name="preferences.accommodation"
                value={formData.preferences.accommodation}
                onChange={handleInputChange}
              >
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
                <option value="villa">Villa</option>
              </select>
            </div>
          </div>
        </div>

        {/* Special Requests */}
        <div className={styles.formSection}>
          <h3>Special Requests</h3>
          <div className={styles.formGroup}>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              placeholder="Any special requirements or requests..."
              rows="4"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm; 