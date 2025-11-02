import React, { useState } from 'react';
import styles from './StandardPackages.module.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaHotel, FaPlane, FaCar, FaUtensils, FaMoneyBillWave } from 'react-icons/fa';
import BookingConfirmation from '../BookingConfirmation/BookingConfirmation';

/**
 * StandardPackages Component
 * 
 * Displays and manages predefined travel packages
 * Features:
 * - Fixed itineraries
 * - Pre-calculated costs
 * - Package details and inclusions
 * - Quick booking process
 */
const StandardPackages = ({ onPackageSelect }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);

  const packages = [
    {
      id: 1,
      name: "Goa Beach Getaway",
      destination: "Goa, India",
      duration: "4 Days / 3 Nights",
      price: 25000,
      description: "Experience the perfect blend of sun, sand, and sea in Goa",
      hotels: "4-star beachfront resort",
      activities: ["Beach hopping", "Water sports", "Nightlife", "Local cuisine"],
      transport: "Private cab for sightseeing",
      image: "https://www.mistay.in/travel-blog/content/images/2020/06/cover-goa-mistay-hotel-rooms.jpg"
    },
    {
      id: 2,
      name: "Kerala Backwaters",
      destination: "Kerala, India",
      duration: "5 Days / 4 Nights",
      price: 35000,
      description: "Cruise through the serene backwaters of Kerala",
      hotels: "Houseboat stay, 4-star resort",
      activities: ["Houseboat cruise", "Ayurvedic spa", "Tea plantation visit", "Kathakali show"],
      transport: "Houseboat, Private cab",
      image: "http://www.visittnt.com/blog/wp-content/uploads/2015/08/kerala_backwater.jpg"
    },
    {
      id: 3,
      name: "Rajasthan Heritage Tour",
      destination: "Rajasthan, India",
      duration: "7 Days / 6 Nights",
      price: 45000,
      description: "Explore the royal heritage of Rajasthan",
      hotels: "Heritage hotels, 5-star properties",
      activities: ["Palace visits", "Desert safari", "Cultural shows", "Shopping"],
      transport: "Private cab with driver",
      image: "https://www.ghumney.com/uploads/0000/19/2021/08/14/rajasthan-tour-g.jpg"
    }
  ];

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setShowBookingConfirmation(true);
    onPackageSelect(pkg);
  };

  const handleBookingComplete = (bookingDetails) => {
    console.log('Booking completed:', bookingDetails);
    setShowBookingConfirmation(false);
    setSelectedPackage(null);
    // You can add additional logic here, like showing a success message or redirecting
  };

  const handleCloseBooking = () => {
    setShowBookingConfirmation(false);
    setSelectedPackage(null);
  };

  return (
    <div className={styles.standardPackages}>
      <h2>Standard Packages</h2>
      <div className={styles.packageGrid}>
        {packages.map((pkg) => (
          <div key={pkg.id} className={styles.packageCard}>
            <div className={styles.packageImage}>
              <img src={pkg.image} alt={pkg.name} />
            </div>
            <div className={styles.packageContent}>
              <h3>{pkg.name}</h3>
              <div className={styles.packageDetails}>
                <div className={styles.detailItem}>
                  <FaMapMarkerAlt />
                  <span>{pkg.destination}</span>
                </div>
                <div className={styles.detailItem}>
                  <FaCalendarAlt />
                  <span>{pkg.duration}</span>
                </div>
                <div className={styles.detailItem}>
                  <FaMoneyBillWave />
                  <span>₹{pkg.price.toLocaleString()}</span>
                </div>
              </div>
              <p className={styles.description}>{pkg.description}</p>
              <div className={styles.inclusions}>
                <h4>Package Includes:</h4>
                <ul>
                  <li><FaHotel /> {pkg.hotels}</li>
                  <li><FaPlane /> {pkg.transport}</li>
                  <li><FaUtensils /> Daily breakfast</li>
                  <li><FaUsers /> Guided tours</li>
                </ul>
              </div>
              <button
                className={styles.bookButton}
                onClick={() => handlePackageSelect(pkg)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {showBookingConfirmation && selectedPackage && (
        <div className={styles.bookingModal}>
          <div className={styles.modalContent}>
            <BookingConfirmation
              selectedPackage={selectedPackage}
              onClose={handleCloseBooking}
              onPaymentComplete={handleBookingComplete}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StandardPackages; 