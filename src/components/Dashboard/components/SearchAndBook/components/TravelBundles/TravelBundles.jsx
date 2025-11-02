import React, { useState } from 'react';
import styles from './TravelBundles.module.css';
import { FaPlane, FaHotel, FaCar, FaUtensils, FaCamera, FaCheck, FaInfoCircle } from 'react-icons/fa';

const TravelBundles = () => {
  const [bundles] = useState([
    {
      id: 1,
      name: 'Adventure Explorer',
      description: 'Perfect for thrill-seekers and nature lovers',
      price: 35000,
      duration: '5 days',
      includes: [
        'Mountain trekking',
        'Camping equipment',
        'Adventure sports',
        'Local guide',
        'Transportation',
        'Meals included'
      ],
      image: 'http://impulseadventures.com.au/exfiles/blog/trekking-ama-dablam.jpg'
    },
    {
      id: 2,
      name: 'Beach Paradise',
      description: 'Relax and unwind at pristine beaches',
      price: 45000,
      duration: '7 days',
      includes: [
        'Beachfront resort',
        'Water sports',
        'Island hopping',
        'Spa treatment',
        'All meals',
        'Airport transfers'
      ],
      image: 'https://farm9.staticflickr.com/8706/16955089022_2d9d12f9bd_o_d.jpg'
    },
    {
      id: 3,
      name: 'Cultural Discovery',
      description: 'Immerse yourself in local traditions',
      price: 40000,
      duration: '6 days',
      includes: [
        'Heritage tours',
        'Cooking classes',
        'Art workshops',
        'Local homestay',
        'Cultural shows',
        'Guided tours'
      ],
      image: 'https://thecreativepost.co.in/wp-content/uploads/2021/12/14-1024x659.jpg'
    }
  ]);

  const [selectedBundle, setSelectedBundle] = useState(null);

  const handleBundleSelect = (bundle) => {
    setSelectedBundle(bundle);
    // Additional logic for bundle selection
    console.log('Selected bundle:', bundle);
  };

  return (
    <div className={styles.travelBundlesContainer}>
      <div className={styles.bundlesHeader}>
        <h2>Curated Travel Bundles</h2>
        <p>Choose from our carefully crafted packages for an unforgettable experience</p>
      </div>

      <div className={styles.bundlesGrid}>
        {bundles.map((bundle) => (
          <div 
            key={bundle.id} 
            className={`${styles.bundleCard} ${selectedBundle?.id === bundle.id ? styles.selected : ''}`}
          >
            <div className={styles.bundleImage}>
              <img src={bundle.image} alt={bundle.name} />
              <span className={styles.duration}>{bundle.duration}</span>
            </div>

            <div className={styles.bundleContent}>
              <h3>{bundle.name}</h3>
              <p>{bundle.description}</p>

              <div className={styles.bundleIncludes}>
                <h4>Package Includes:</h4>
                <ul>
                  {bundle.includes.map((item, index) => (
                    <li key={index}>
                      <FaCheck className={styles.checkIcon} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.bundleFooter}>
                <div className={styles.bundlePrice}>
                  <span className={styles.priceLabel}>Starting from</span>
                  <span className={styles.priceAmount}>₹{bundle.price.toLocaleString()}</span>
                </div>

                <button 
                  className={styles.selectButton}
                  onClick={() => handleBundleSelect(bundle)}
                >
                  Select Bundle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bundles.length === 0 && (
        <div className={styles.noBundles}>
          <FaInfoCircle />
          <p>No travel bundles available at the moment</p>
        </div>
      )}
    </div>
  );
};

export default TravelBundles; 