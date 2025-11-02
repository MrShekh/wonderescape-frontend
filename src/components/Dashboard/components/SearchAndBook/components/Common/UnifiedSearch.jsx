import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaPlane, FaTrain, FaBus, FaHotel } from 'react-icons/fa';
import styles from './UnifiedSearch.module.css';

/**
 * UnifiedSearch Component
 * 
 * A unified search interface for destinations, transport, and accommodations
 * Features:
 * - Real-time suggestions
 * - Multi-category search (destinations, flights, trains, buses, hotels)
 * - Search history integration
 */
const UnifiedSearch = ({ onSearch, userPreferences }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  // Categories for unified search
  const categories = [
    { id: 'all', label: 'All', icon: <FaSearch /> },
    { id: 'destinations', label: 'Destinations', icon: <FaMapMarkerAlt /> },
    { id: 'flights', label: 'Flights', icon: <FaPlane /> },
    { id: 'trains', label: 'Trains', icon: <FaTrain /> },
    { id: 'buses', label: 'Buses', icon: <FaBus /> },
    { id: 'hotels', label: 'Hotels', icon: <FaHotel /> },
  ];

  /**
   * Fetch suggestions based on search term and category
   * Simulated API call - replace with actual API integration
   */
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Mock suggestions - replace with actual API call
      const mockSuggestions = [
        { id: 1, type: 'destination', name: 'Mumbai, India' },
        { id: 2, type: 'destination', name: 'Manali, India' },
        { id: 3, type: 'flight', name: 'Mumbai to Delhi' },
        { id: 4, type: 'hotel', name: 'Taj Hotel, Mumbai' },
      ].filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === 'all' || item.type === category)
      );

      setSuggestions(mockSuggestions);
    };

    fetchSuggestions();
  }, [searchTerm, category]);

  /**
   * Handle search submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch({ term: searchTerm, category });
      // Add to recent searches
      setRecentSearches(prev => [
        { term: searchTerm, category },
        ...prev.slice(0, 4)
      ]);
    }
  };

  return (
    <div className={styles.unifiedSearchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.categoryTabs}>
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.categoryTab} ${category === cat.id ? styles.active : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
        
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search destinations, flights, hotels..."
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <FaSearch />
            Search
          </button>
        </div>

        {suggestions.length > 0 && (
          <div className={styles.suggestionsContainer}>
            {suggestions.map(suggestion => (
              <div
                key={suggestion.id}
                className={styles.suggestionItem}
                onClick={() => {
                  setSearchTerm(suggestion.name);
                  handleSubmit({ preventDefault: () => {} });
                }}
              >
                {suggestion.name}
              </div>
            ))}
          </div>
        )}

        {recentSearches.length > 0 && !searchTerm && (
          <div className={styles.recentSearches}>
            <h4>Recent Searches</h4>
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className={styles.recentSearchItem}
                onClick={() => setSearchTerm(search.term)}
              >
                {categories.find(cat => cat.id === search.category)?.icon}
                <span>{search.term}</span>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default UnifiedSearch; 