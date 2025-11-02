import React from 'react';
import { FaTag, FaPlane, FaHotel, FaMapMarkedAlt, FaClock } from 'react-icons/fa';
import styles from './DealsAndOffers.module.css';

const DealsAndOffers = () => {
  return (
    <div className={styles.dealsContainer}>
      <header className={styles.header}>
        <h1>Deals & Offers</h1>
        <p>Find the best travel deals and discounts</p>
      </header>

      <div className={styles.dealsGrid}>
        <div className={styles.dealCard}>
          <div className={styles.dealBadge}>
            <FaTag /> 20% OFF
          </div>
          <div className={styles.dealImage}>
            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470" alt="Deal" />
          </div>
          <div className={styles.dealContent}>
            <h3>Early Bird Flight Deals</h3>
            <p>Book your flights 3 months in advance and get 20% off</p>
            <div className={styles.dealDetails}>
              <div className={styles.detailItem}>
                <FaClock />
                <span>Valid till 30 Apr 2024</span>
              </div>
              <div className={styles.detailItem}>
                <FaPlane />
                <span>All Domestic Flights</span>
              </div>
            </div>
            <button className={styles.claimButton}>Claim Offer</button>
          </div>
        </div>

        <div className={styles.dealCard}>
          <div className={styles.dealBadge}>
            <FaTag /> 15% OFF
          </div>
          <div className={styles.dealImage}>
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945" alt="Deal" />
          </div>
          <div className={styles.dealContent}>
            <h3>Weekend Hotel Specials</h3>
            <p>Get 15% off on weekend stays at premium hotels</p>
            <div className={styles.dealDetails}>
              <div className={styles.detailItem}>
                <FaClock />
                <span>Valid till 31 May 2024</span>
              </div>
              <div className={styles.detailItem}>
                <FaHotel />
                <span>Select Hotels</span>
              </div>
            </div>
            <button className={styles.claimButton}>Claim Offer</button>
          </div>
        </div>

        <div className={styles.dealCard}>
          <div className={styles.dealBadge}>
            <FaTag /> 25% OFF
          </div>
          <div className={styles.dealImage}>
            <img src="https://images.unsplash.com/photo-1587474260584-136574528b5b" alt="Deal" />
          </div>
          <div className={styles.dealContent}>
            <h3>Adventure Activities</h3>
            <p>25% off on adventure activities and guided tours</p>
            <div className={styles.dealDetails}>
              <div className={styles.detailItem}>
                <FaClock />
                <span>Valid till 30 Jun 2024</span>
              </div>
              <div className={styles.detailItem}>
                <FaMapMarkedAlt />
                <span>All Destinations</span>
              </div>
            </div>
            <button className={styles.claimButton}>Claim Offer</button>
          </div>
        </div>
      </div>

      <div className={styles.personalizedDeals}>
        <h2>Personalized Deals</h2>
        <div className={styles.personalizedGrid}>
          <div className={styles.personalizedCard}>
            <div className={styles.personalizedContent}>
              <h3>First Time User Offer</h3>
              <p>Get ₹500 off on your first booking</p>
              <div className={styles.personalizedDetails}>
                <div className={styles.detailItem}>
                  <FaClock />
                  <span>Valid for 7 days</span>
                </div>
                <div className={styles.detailItem}>
                  <FaTag />
                  <span>Min. booking value ₹2,000</span>
                </div>
              </div>
              <button className={styles.claimButton}>Use Coupon</button>
            </div>
          </div>

          <div className={styles.personalizedCard}>
            <div className={styles.personalizedContent}>
              <h3>Referral Bonus</h3>
              <p>Get ₹1,000 when you refer a friend</p>
              <div className={styles.personalizedDetails}>
                <div className={styles.detailItem}>
                  <FaClock />
                  <span>No expiry</span>
                </div>
                <div className={styles.detailItem}>
                  <FaTag />
                  <span>Friend gets ₹500 off</span>
                </div>
              </div>
              <button className={styles.claimButton}>Refer Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsAndOffers; 