import React, { useState, useEffect } from 'react';
import styles from './SmartSearch.module.css';
import { FaPlane, FaCalendarAlt, FaUser, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const SmartSearch = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1,
    preferences: []
  });

  const [suggestions, setSuggestions] = useState({
    from: [],
    to: []
  });

  // Mock data for suggestions
  const popularDestinations = [
    'Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai',
    'Manali', 'Goa', 'Jaipur', 'Kerala', 'Shimla'
  ];

  // Mock function for getting suggestions based on user input
  const getSuggestions = (input, type) => {
    const filtered = popularDestinations.filter(
      city => city.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(prev => ({
      ...prev,
      [type]: filtered
    }));
  };

  useEffect(() => {
    // Clear suggestions when component mounts
    setSuggestions({ from: [], to: [] });
  }, []);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'from' || field === 'to') {
      getSuggestions(value, field);
    }
  };

  const handleSuggestionClick = (value, field) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
    setSuggestions(prev => ({
      ...prev,
      [field]: []
    }));
  };

  const handleSearch = () => {
    onSearch(searchData);
  };

  return (
    <div className={styles.smartSearchContainer}>
      <div className={styles.searchInputs}>
        {/* From Location */}
        <div className={styles.inputGroup}>
          <FaMapMarkerAlt className={styles.icon} />
          <div className={styles.inputWithSuggestions}>
            <input
              type="text"
              placeholder="From"
              value={searchData.from}
              onChange={(e) => handleInputChange(e, 'from')}
            />
            {suggestions.from.length > 0 && (
              <div className={styles.suggestions}>
                {suggestions.from.map((suggestion, index) => (
                  <div
                    key={index}
                    className={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(suggestion, 'from')}
                  >
                    <FaMapMarkerAlt /> {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* To Location */}
        <div className={styles.inputGroup}>
          <FaMapMarkerAlt className={styles.icon} />
          <div className={styles.inputWithSuggestions}>
            <input
              type="text"
              placeholder="To"
              value={searchData.to}
              onChange={(e) => handleInputChange(e, 'to')}
            />
            {suggestions.to.length > 0 && (
              <div className={styles.suggestions}>
                {suggestions.to.map((suggestion, index) => (
                  <div
                    key={index}
                    className={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(suggestion, 'to')}
                  >
                    <FaMapMarkerAlt /> {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Date Selection */}
        <div className={styles.inputGroup}>
          <FaCalendarAlt className={styles.icon} />
          <input
            type="date"
            value={searchData.date}
            onChange={(e) => handleInputChange(e, 'date')}
          />
        </div>

        {/* Passengers */}
        <div className={styles.inputGroup}>
          <FaUser className={styles.icon} />
          <input
            type="number"
            min="1"
            placeholder="Passengers"
            value={searchData.passengers}
            onChange={(e) => handleInputChange(e, 'passengers')}
          />
        </div>
      </div>

      {/* Preferences */}
      <div className={styles.preferences}>
        <label>Preferences:</label>
        <div className={styles.preferencesOptions}>
          {['Budget', 'Comfort', 'Luxury', 'Quick'].map((pref) => (
            <label key={pref} className={styles.preferenceLabel}>
              <input
                type="checkbox"
                checked={searchData.preferences.includes(pref)}
                onChange={(e) => {
                  setSearchData(prev => ({
                    ...prev,
                    preferences: e.target.checked
                      ? [...prev.preferences, pref]
                      : prev.preferences.filter(p => p !== pref)
                  }));
                }}
              />
              {pref}
            </label>
          ))}
        </div>
      </div>

      <button className={styles.searchButton} onClick={handleSearch}>
        <FaSearch /> Search
      </button>
    </div>
  );
};

export default SmartSearch; 