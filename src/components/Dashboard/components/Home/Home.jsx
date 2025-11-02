import React, { useState } from 'react';
import styles from './Home.module.css';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { MdOutlineFlight, MdHotel, MdOutlineDirectionsBike } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';

const Home = ({ userData }) => {
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('transport');

  // Mock data for featured destinations
  const featuredDestinations = [
    {
      id: 1,
      name: 'Manali, India',
      image: 'https://www.akshartours.com/wp-content/uploads/2020/07/SOLANG-VALLEY.jpg',
      price: '₹45,000',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3',
      price: '₹65,000',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Goa, India',
      image: 'https://miro.medium.com/max/4672/1*Z_1KPMQDt91XWvA2CUGm_Q.jpeg',
      price: '₹30,000',
      rating: 4.7
    }
  ];

  // Mock data for exclusive offers
  const exclusiveOffers = [
    {
      id: 1,
      title: 'Summer Special',
      description: 'Get 20% off on all international flights',
      code: 'SUMMER20',
      validUntil: '31 Aug 2024'
    },
    {
      id: 2,
      title: 'Weekend Getaway',
      description: 'Book 2 nights, get 1 night free',
      code: 'WEEKEND',
      validUntil: '30 Sep 2024'
    }
  ];

  return (
    <div className={styles.homeContainer}>
      {/* Welcome Section */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <h1>Welcome, {userData?.name || 'Guest'}!</h1>
          <blockquote>
            "Your journey begins with WanderScape – Explore, Book, Wander!"
          </blockquote>
          <blockquote>
            "Where will WanderScape take you today? Let's find out!"
          </blockquote>
        </div>
      </div>

      {/* Quick Search Section */}
      <div className={styles.searchSection}>
        <h2>Quick Search</h2>
        <div className={styles.searchContainer}>
          <div className={styles.searchInput}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for trips, places, or activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className={styles.searchButton}>Search</button>
        </div>
      </div>

      {/* Featured Destinations Section */}
      <div className={styles.featuredSection}>
        <h2>Featured Destinations</h2>
        <div className={styles.destinationsGrid}>
          {featuredDestinations.map((destination) => (
            <div key={destination.id} className={styles.destinationCard}>
              <img src={destination.image} alt={destination.name} />
              <div className={styles.destinationInfo}>
                <h3>{destination.name}</h3>
                <div className={styles.destinationMeta}>
                  <span className={styles.price}>{destination.price}</span>
                  <span className={styles.rating}>★ {destination.rating}</span>
                </div>
                <button className={styles.exploreButton}>
                  Explore <IoIosArrowForward />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exclusive Offers Section */}
      <div className={styles.offersSection}>
        <h2>Exclusive Offers</h2>
        <div className={styles.offersGrid}>
          {exclusiveOffers.map((offer) => (
            <div key={offer.id} className={styles.offerCard}>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <div className={styles.offerCode}>
                <span>Use Code:</span>
                <strong>{offer.code}</strong>
              </div>
              <div className={styles.offerValid}>
                Valid until: {offer.validUntil}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Trips Section */}
      <div className={styles.tripsSection}>
        <h2>Your Upcoming Trips</h2>
        <div className={styles.noTripsMessage}>
          <p>No upcoming trips planned yet.</p>
          <button className={styles.planTripButton}>Plan a Trip</button>
        </div>
      </div>
    </div>
  );
};

export default Home; 