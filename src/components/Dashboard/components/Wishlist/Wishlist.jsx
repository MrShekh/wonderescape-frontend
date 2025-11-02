import React from 'react';
import { FaHeart, FaPlane, FaHotel, FaMapMarkedAlt, FaTrash } from 'react-icons/fa';
import styles from './Wishlist.module.css';

const Wishlist = () => {
  return (
    <div className={styles.wishlistContainer}>
      <header className={styles.header}>
        <h1>My Wishlist</h1>
        <p>Save your favorite destinations and experiences</p>
      </header>

      <div className={styles.wishlistGrid}>
        <div className={styles.wishlistCard}>
          <div className={styles.cardHeader}>
            <FaPlane className={styles.cardIcon} />
            <div className={styles.cardInfo}>
              <h3>Mumbai to Delhi</h3>
              <p>Flight • 2 Adults</p>
            </div>
            <button className={styles.removeButton}>
              <FaTrash />
            </button>
          </div>
          <div className={styles.cardDetails}>
            <div className={styles.detailItem}>
              <FaMapMarkedAlt />
              <span>Indira Gandhi International Airport</span>
            </div>
            <div className={styles.detailItem}>
              <FaPlane />
              <span>₹4,500 per person</span>
            </div>
          </div>
          <button className={styles.bookButton}>Book Now</button>
        </div>

        <div className={styles.wishlistCard}>
          <div className={styles.cardHeader}>
            <FaHotel className={styles.cardIcon} />
            <div className={styles.cardInfo}>
              <h3>Grand Hotel</h3>
              <p>Hotel • 2 Nights</p>
            </div>
            <button className={styles.removeButton}>
              <FaTrash />
            </button>
          </div>
          <div className={styles.cardDetails}>
            <div className={styles.detailItem}>
              <FaMapMarkedAlt />
              <span>Connaught Place, Delhi</span>
            </div>
            <div className={styles.detailItem}>
              <FaHotel />
              <span>₹2,500 per night</span>
            </div>
          </div>
          <button className={styles.bookButton}>Book Now</button>
        </div>

        <div className={styles.wishlistCard}>
          <div className={styles.cardHeader}>
            <FaMapMarkedAlt className={styles.cardIcon} />
            <div className={styles.cardInfo}>
              <h3>Delhi City Tour</h3>
              <p>Activity • Full Day</p>
            </div>
            <button className={styles.removeButton}>
              <FaTrash />
            </button>
          </div>
          <div className={styles.cardDetails}>
            <div className={styles.detailItem}>
              <FaMapMarkedAlt />
              <span>Delhi, India</span>
            </div>
            <div className={styles.detailItem}>
              <FaMapMarkedAlt />
              <span>₹1,500 per person</span>
            </div>
          </div>
          <button className={styles.bookButton}>Book Now</button>
        </div>
      </div>

      <div className={styles.emptyState}>
        <FaHeart className={styles.emptyIcon} />
        
        <p>Start adding destinations and experiences you'd like to visit</p>
        <button className={styles.exploreButton}>Explore Destinations</button>
      </div>
    </div>
  );
};

export default Wishlist; 