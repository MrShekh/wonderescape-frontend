import React from 'react';
import styles from './RouteOptions.module.css';
import { FaPlane, FaTrain, FaBus, FaCar, FaExchangeAlt, FaClock, FaMoneyBillWave } from 'react-icons/fa';

const RouteOptions = ({ searchResults, onRouteSelect }) => {
  // Mock data for route options
  const routeOptions = [
    {
      id: 1,
      type: 'Direct Flight',
      segments: [
        {
          mode: 'flight',
          from: 'Mumbai',
          to: 'Manali',
          duration: '2h 15m',
          operator: 'Air India',
          price: 4500
        }
      ],
      totalDuration: '2h 15m',
      totalPrice: 4500
    },
    {
      id: 2,
      type: 'Train + Cab',
      segments: [
        {
          mode: 'train',
          from: 'Mumbai',
          to: 'Delhi',
          duration: '16h',
          operator: 'Indian Railways',
          price: 1500
        },
        {
          mode: 'cab',
          from: 'Delhi',
          to: 'Manali',
          duration: '12h',
          operator: 'OLA Cabs',
          price: 3500
        }
      ],
      totalDuration: '28h',
      totalPrice: 5000
    },
    {
      id: 3,
      type: 'Bus + Cab',
      segments: [
        {
          mode: 'bus',
          from: 'Mumbai',
          to: 'Delhi',
          duration: '18h',
          operator: 'VRL Travels',
          price: 1200
        },
        {
          mode: 'cab',
          from: 'Delhi',
          to: 'Manali',
          duration: '12h',
          operator: 'Uber',
          price: 3500
        }
      ],
      totalDuration: '30h',
      totalPrice: 4700
    }
  ];

  const getTransportIcon = (mode) => {
    switch (mode) {
      case 'flight':
        return <FaPlane />;
      case 'train':
        return <FaTrain />;
      case 'bus':
        return <FaBus />;
      case 'cab':
        return <FaCar />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.routeOptionsContainer}>
      {routeOptions.map((route) => (
        <div key={route.id} className={styles.routeCard}>
          <div className={styles.routeHeader}>
            <h3>{route.type}</h3>
            <div className={styles.routeMeta}>
              <span><FaClock /> {route.totalDuration}</span>
              <span><FaMoneyBillWave /> ₹{route.totalPrice}</span>
            </div>
          </div>

          <div className={styles.routeSegments}>
            {route.segments.map((segment, index) => (
              <div key={index} className={styles.segment}>
                <div className={styles.segmentIcon}>
                  {getTransportIcon(segment.mode)}
                </div>
                <div className={styles.segmentDetails}>
                  <div className={styles.segmentRoute}>
                    <span>{segment.from}</span>
                    <FaExchangeAlt className={styles.exchangeIcon} />
                    <span>{segment.to}</span>
                  </div>
                  <div className={styles.segmentMeta}>
                    <span>{segment.operator}</span>
                    <span>{segment.duration}</span>
                    <span>₹{segment.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.routeActions}>
            <button 
              className={styles.selectButton}
              onClick={() => onRouteSelect(route)}
            >
              Select Route
            </button>
            <button className={styles.detailsButton}>
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RouteOptions; 