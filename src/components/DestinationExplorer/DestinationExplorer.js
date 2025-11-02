import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './DestinationExplorer.css';

const DestinationExplorer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedAdventure, setSelectedAdventure] = useState('all');
  const [wishlist, setWishlist] = useState([]);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' }
  ];

  const budgets = [
    { value: 'all', label: 'All Budgets' },
    { value: 'budget', label: 'Budget' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'luxury', label: 'Luxury' }
  ];

  const adventureTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'beach', label: 'Beach' },
    { value: 'mountain', label: 'Mountain' },
    { value: 'city', label: 'City' },
    { value: 'cultural', label: 'Cultural' }
  ];

  const destinations = [
    {
      id: 1,
      name: {
        en: 'Bali, Indonesia',
        es: 'Bali, Indonesia',
        fr: 'Bali, Indonésie',
        de: 'Bali, Indonesien'
      },
      description: {
        en: 'Paradise island with beautiful beaches and rich culture',
        es: 'Isla paradisíaca con hermosas playas y rica cultura',
        fr: 'Île paradisiaque aux belles plages et riche culture',
        de: 'Paradiesinsel mit schönen Stränden und reicher Kultur'
      },
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      budget: 'moderate',
      adventureType: 'beach',
      price: '$999'
    },
    {
      id: 2,
      name: {
        en: 'Swiss Alps',
        es: 'Alpes Suizos',
        fr: 'Alpes Suisses',
        de: 'Schweizer Alpen'
      },
      description: {
        en: 'Majestic mountains and world-class skiing',
        es: 'Montañas majestuosas y esquí de clase mundial',
        fr: 'Montagnes majestueuses et ski de classe mondiale',
        de: 'Majestätische Berge und erstklassiges Skifahren'
      },
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      budget: 'luxury',
      adventureType: 'mountain',
      price: '$1999'
    },
    {
      id: 3,
      name: {
        en: 'Kyoto, Japan',
        es: 'Kioto, Japón',
        fr: 'Kyoto, Japon',
        de: 'Kyoto, Japan'
      },
      description: {
        en: 'Ancient temples and traditional gardens',
        es: 'Templos antiguos y jardines tradicionales',
        fr: 'Temples anciens et jardins traditionnels',
        de: 'Antike Tempel und traditionelle Gärten'
      },
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
      budget: 'moderate',
      adventureType: 'cultural',
      price: '$1499'
    }
  ];

  const toggleWishlist = (destinationId) => {
    setWishlist(prev => 
      prev.includes(destinationId)
        ? prev.filter(id => id !== destinationId)
        : [...prev, destinationId]
    );
  };

  const filteredDestinations = destinations.filter(destination => {
    const budgetMatch = selectedBudget === 'all' || destination.budget === selectedBudget;
    const adventureMatch = selectedAdventure === 'all' || destination.adventureType === selectedAdventure;
    return budgetMatch && adventureMatch;
  });

  return (
    <div className="destination-explorer">
      <div className="filters-section">
        <div className="language-selector">
          <select 
            value={selectedLanguage} 
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <select 
            value={selectedBudget} 
            onChange={(e) => setSelectedBudget(e.target.value)}
          >
            {budgets.map(budget => (
              <option key={budget.value} value={budget.value}>
                {budget.label}
              </option>
            ))}
          </select>

          <select 
            value={selectedAdventure} 
            onChange={(e) => setSelectedAdventure(e.target.value)}
          >
            {adventureTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="destinations-grid">
        {filteredDestinations.map(destination => (
          <div key={destination.id} className="destination-card">
            <div className="image-container">
              <img src={destination.image} alt={destination.name[selectedLanguage]} />
              <button 
                className="wishlist-button"
                onClick={() => toggleWishlist(destination.id)}
              >
                {wishlist.includes(destination.id) ? (
                  <FaHeart className="wishlist-icon filled" />
                ) : (
                  <FaRegHeart className="wishlist-icon" />
                )}
              </button>
            </div>
            <div className="destination-info">
              <h3>{destination.name[selectedLanguage]}</h3>
              <p>{destination.description[selectedLanguage]}</p>
              <div className="destination-meta">
                <span className="budget">{destination.budget}</span>
                <span className="adventure-type">{destination.adventureType}</span>
                <span className="price">{destination.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationExplorer; 