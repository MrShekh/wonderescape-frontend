import React, { useState } from 'react';
import { FaCar, FaHiking, FaSwimmingPool, FaUtensils, FaTicketAlt } from 'react-icons/fa';
import styles from './CabAndActivities.module.css';

const CabAndActivities = () => {
  const [activeTab, setActiveTab] = useState('cab'); // 'cab' or 'activities'

  const activities = [
    {
      id: 1,
      title: 'Mountain Trekking',
      description: 'Experience the thrill of mountain trekking with expert guides',
      price: '₹2,500',
      duration: '6 hours',
      image: 'https://source.unsplash.com/random/400x300/?mountain'
    },
    {
      id: 2,
      title: 'Water Sports',
      description: 'Enjoy exciting water sports activities at the beach',
      price: '₹1,800',
      duration: '4 hours',
      image: 'https://source.unsplash.com/random/400x300/?beach'
    },
    {
      id: 3,
      title: 'Food Tour',
      description: 'Explore local cuisine with a guided food tour',
      price: '₹1,200',
      duration: '3 hours',
      image: 'https://source.unsplash.com/random/400x300/?food'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Transport & Activities</h1>
        <p>Book your rides and explore exciting activities</p>
      </div>

      <div className={styles.tabSelector}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'cab' ? styles.active : ''}`}
          onClick={() => setActiveTab('cab')}
        >
          <FaCar /> Cab Services
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'activities' ? styles.active : ''}`}
          onClick={() => setActiveTab('activities')}
        >
          <FaHiking /> Activities
        </button>
      </div>

      {activeTab === 'cab' ? (
        <div className={styles.cabSection}>
          <div className={styles.cabCard}>
            <FaCar className={styles.cabIcon} />
            <h3>Book a Cab</h3>
            <p>Safe and comfortable rides at your convenience</p>
            <button className={styles.bookButton}>Book Now</button>
          </div>
        </div>
      ) : (
        <div className={styles.activitiesGrid}>
          {activities.map(activity => (
            <div key={activity.id} className={styles.activityCard}>
              <div className={styles.activityImage}>
                <img src={activity.image} alt={activity.title} />
              </div>
              <div className={styles.activityContent}>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <div className={styles.activityDetails}>
                  <span className={styles.price}>{activity.price}</span>
                  <span className={styles.duration}>{activity.duration}</span>
                </div>
                <button className={styles.bookButton}>
                  <FaTicketAlt /> Book Activity
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CabAndActivities; 