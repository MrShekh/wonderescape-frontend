import React, { useState } from 'react';
import { FaPlane, FaHotel, FaMapMarkedAlt, FaUsers, FaWallet, FaCalendarAlt, FaUmbrellaBeach, FaCar } from 'react-icons/fa';
import styles from './CustomizedBooking.module.css';

/**
 * CustomizedBooking Component
 * 
 * Handles flexible travel planning with dynamic recommendations
 * Features:
 * - Custom date selection
 * - Flexible destination options
 * - Accommodation preferences
 * - Activity selection
 * - Dynamic pricing
 * - Transport options
 */
const CustomizedBooking = ({ onCustomizeComplete }) => {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    guests: 1,
    accommodation: 'hotel',
    transport: 'flight',
    activities: [],
    budget: '',
    preferences: []
  });

  const [step, setStep] = useState(1);
  const [recommendations, setRecommendations] = useState(null);

  // Configuration options
  const accommodationTypes = [
    { id: 'hotel', label: 'Hotel', icon: <FaHotel /> },
    { id: 'resort', label: 'Resort', icon: <FaUmbrellaBeach /> },
    { id: 'apartment', label: 'Apartment', icon: <FaHotel /> },
    { id: 'villa', label: 'Villa', icon: <FaHotel /> }
  ];

  const transportTypes = [
    { id: 'flight', label: 'Flight', icon: <FaPlane /> },
    { id: 'train', label: 'Train', icon: <FaPlane /> },
    { id: 'bus', label: 'Bus', icon: <FaCar /> },
    { id: 'car', label: 'Car Rental', icon: <FaCar /> }
  ];

  const activities = [
    'City Tours',
    'Adventure Sports',
    'Cultural Experiences',
    'Food Tours',
    'Nature Walks',
    'Water Sports',
    'Shopping Tours',
    'Nightlife'
  ];

  const preferences = [
    'Early Check-in',
    'Late Check-out',
    'Airport Transfer',
    'Meal Preferences',
    'Room Preferences',
    'Special Assistance'
  ];

  const budgetRanges = [
    { id: '0-25000', label: '₹0 - ₹25,000' },
    { id: '25000-50000', label: '₹25,000 - ₹50,000' },
    { id: '50000-100000', label: '₹50,000 - ₹1,00,000' },
    { id: '100000+', label: '₹1,00,000+' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleSelection = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const generateRecommendations = () => {
    // Simulate API call for recommendations
    setTimeout(() => {
      setRecommendations({
        transport: [
          {
            type: 'flight',
            provider: 'IndiGo',
            price: 5200,
            duration: '2h 30m'
          },
          {
            type: 'flight',
            provider: 'Air India',
            price: 6100,
            duration: '2h 15m'
          }
        ],
        accommodation: [
          {
            name: 'Luxury Hotel & Spa',
            type: 'hotel',
            price: 12000,
            rating: 4.5
          },
          {
            name: 'Beachfront Resort',
            type: 'resort',
            price: 15000,
            rating: 4.8
          }
        ],
        activities: [
          {
            name: 'City Heritage Walk',
            price: 1500,
            duration: '3 hours'
          },
          {
            name: 'Sunset Cruise',
            price: 2500,
            duration: '2 hours'
          }
        ]
      });
    }, 1000);
  };

  const handleNext = () => {
    if (step === 3) {
      generateRecommendations();
    }
    setStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    onCustomizeComplete({
      ...formData,
      recommendations
    });
  };

  return (
    <div className={styles.customizedBookingContainer}>
      <div className={styles.progressBar}>
        <div className={styles.progressSteps}>
          {[1, 2, 3, 4].map(stepNumber => (
            <div
              key={stepNumber}
              className={`${styles.step} ${step >= stepNumber ? styles.active : ''}`}
            >
              {stepNumber === 1 && <FaMapMarkedAlt />}
              {stepNumber === 2 && <FaCalendarAlt />}
              {stepNumber === 3 && <FaUmbrellaBeach />}
              {stepNumber === 4 && <FaWallet />}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.formContent}>
        {step === 1 && (
          <div className={styles.formStep}>
            <h3>Where would you like to go?</h3>
            <div className={styles.inputGroup}>
              <FaMapMarkedAlt />
              <input
                type="text"
                placeholder="Enter destination"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <FaUsers />
              <input
                type="number"
                min="1"
                placeholder="Number of guests"
                value={formData.guests}
                onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.formStep}>
            <h3>When are you planning to travel?</h3>
            <div className={styles.dateInputs}>
              <div className={styles.inputGroup}>
                <FaCalendarAlt />
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <FaCalendarAlt />
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.formStep}>
            <h3>Customize your experience</h3>
            
            <div className={styles.optionsSection}>
              <h4>Accommodation Type</h4>
              <div className={styles.optionsGrid}>
                {accommodationTypes.map(type => (
                  <button
                    key={type.id}
                    className={`${styles.optionButton} ${formData.accommodation === type.id ? styles.active : ''}`}
                    onClick={() => handleInputChange('accommodation', type.id)}
                  >
                    {type.icon}
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.optionsSection}>
              <h4>Transport Preference</h4>
              <div className={styles.optionsGrid}>
                {transportTypes.map(type => (
                  <button
                    key={type.id}
                    className={`${styles.optionButton} ${formData.transport === type.id ? styles.active : ''}`}
                    onClick={() => handleInputChange('transport', type.id)}
                  >
                    {type.icon}
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.optionsSection}>
              <h4>Activities</h4>
              <div className={styles.tagGrid}>
                {activities.map(activity => (
                  <button
                    key={activity}
                    className={`${styles.tag} ${formData.activities.includes(activity) ? styles.active : ''}`}
                    onClick={() => toggleSelection('activities', activity)}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.optionsSection}>
              <h4>Additional Preferences</h4>
              <div className={styles.tagGrid}>
                {preferences.map(pref => (
                  <button
                    key={pref}
                    className={`${styles.tag} ${formData.preferences.includes(pref) ? styles.active : ''}`}
                    onClick={() => toggleSelection('preferences', pref)}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className={styles.formStep}>
            <h3>Budget Range</h3>
            <div className={styles.budgetOptions}>
              {budgetRanges.map(range => (
                <button
                  key={range.id}
                  className={`${styles.budgetButton} ${formData.budget === range.id ? styles.active : ''}`}
                  onClick={() => handleInputChange('budget', range.id)}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {recommendations && (
              <div className={styles.recommendations}>
                <h4>Recommended Options</h4>
                {/* Display recommendations here */}
              </div>
            )}
          </div>
        )}

        <div className={styles.navigationButtons}>
          {step > 1 && (
            <button className={styles.backButton} onClick={handleBack}>
              Back
            </button>
          )}
          {step < 4 ? (
            <button className={styles.nextButton} onClick={handleNext}>
              Next
            </button>
          ) : (
            <button className={styles.submitButton} onClick={handleSubmit}>
              Generate Itinerary
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizedBooking; 