import React, { useState, useEffect } from 'react';
import { FaPlane, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaHotel, FaCarSide, FaTimes, FaStar, FaMoneyBillWave, FaPassport } from 'react-icons/fa';
import styles from './Trips.module.css';

const Trips = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [trips, setTrips] = useState({
    upcoming: [],
    ongoing: [],
    past: []
  });

  // Define default past trips
  const defaultPastTrips = [
    {
      id: 1,
      destination: 'Assam',
      startDate: '2023-12-15',
      endDate: '2023-12-22',
      image: 'https://farm1.staticflickr.com/791/40339486635_7aeae542eb_b.jpg',
      location: 'Guwahati, Assam',
      hotel: 'Radisson Blu Hotel',
      transport: 'Flight + Local Transport',
      status: 'Past',
      activities: ['Kaziranga Safari', 'Tea Garden Visit', 'River Cruise'],
      highlights: ['Wildlife Safari', 'Tea Plantations', 'Local Cuisine'],
      bookingDetails: {
        bookingId: 'TRP123456',
        price: '₹45,000',
        guests: 2,
        roomType: 'Deluxe',
        mealPlan: 'Breakfast Included',
        flightNo: 'AI-123',
        departureTime: '08:00 AM',
        arrivalTime: '10:30 AM'
      }
    },
    {
      id: 2,
      destination: 'Rome',
      startDate: '2023-10-05',
      endDate: '2023-10-12',
      image: 'https://assets-global.website-files.com/5f8814417b0c112e48ec1b91/5f8814417b0c113498ec283c_Colosseum%20in%20Rome%20and%20morning%20sun%2C%20Italy-539115110%20edit%20SMALLER.jpg ',
      location: 'Rome, Italy',
      hotel: 'Hotel Artemide',
      transport: 'Flight + Metro',
      status: 'Past',
      activities: ['Colosseum Tour', 'Vatican Visit', 'Food Tour'],
      highlights: ['Historical Sites', 'Italian Cuisine', 'Art & Culture'],
      bookingDetails: {
        bookingId: 'TRP789012',
        price: '₹85,000',
        guests: 2,
        roomType: 'Superior',
        mealPlan: 'Breakfast Included',
        flightNo: 'AZ-456',
        departureTime: '10:00 PM',
        arrivalTime: '06:00 AM'
      }
    }
  ];

  // Load trips from localStorage on component mount
  useEffect(() => {
    const loadTrips = () => {
      console.log('Loading trips from localStorage');
      const savedTrips = localStorage.getItem('userTrips');
      console.log('Raw localStorage data:', savedTrips);
      if (savedTrips) {
        try {
          const parsedTrips = JSON.parse(savedTrips);
          console.log('Parsed trips:', parsedTrips);
          
          // Check if default trips are already in past trips
          const hasDefaultTrips = parsedTrips.past?.some(trip => 
            trip.id === 1 || trip.id === 2
          );

          setTrips({
            upcoming: parsedTrips.upcoming || [],
            ongoing: parsedTrips.ongoing || [],
            past: hasDefaultTrips ? parsedTrips.past : [...(parsedTrips.past || []), ...defaultPastTrips]
          });
        } catch (error) {
          console.error('Error parsing trips:', error);
          setTrips({
            upcoming: [],
            ongoing: [],
            past: defaultPastTrips
          });
        }
      } else {
        // If no trips exist, set default past trips
        setTrips({
          upcoming: [],
          ongoing: [],
          past: defaultPastTrips
        });
      }
    };

    // Load trips immediately
    loadTrips();

    // Also load trips after a short delay to ensure we get the latest data
    const timer = setTimeout(loadTrips, 200);
    return () => clearTimeout(timer);
  }, []);

  // Save trips to localStorage whenever they change
  useEffect(() => {
    console.log('Saving trips to localStorage:', trips);
    try {
      localStorage.setItem('userTrips', JSON.stringify(trips));
    } catch (error) {
      console.error('Error saving trips:', error);
    }
  }, [trips]);

  // Function to add a new trip
  const addNewTrip = (newTrip) => {
    setTrips(prev => ({
      ...prev,
      upcoming: [...prev.upcoming, {
        ...newTrip,
        id: Date.now(), // Generate unique ID
        status: 'Upcoming',
        bookingDetails: {
          bookingId: `TRP${Date.now()}`,
          price: newTrip.price || '₹0',
          guests: newTrip.guests || 1,
          roomType: newTrip.roomType || 'Standard',
          mealPlan: newTrip.mealPlan || 'Not Included'
        }
      }]
    }));
  };

  const renderTripCard = (trip) => {
    const startDate = new Date(trip.startDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const endDate = new Date(trip.endDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const handleImageError = (e) => {
      e.target.src = 'https://source.unsplash.com/random/800x600/?travel'; // Fallback image
    };

    return (
      <div key={trip.id} className={styles.tripCard}>
        <div className={styles.tripImage}>
          <img 
            src={trip.image} 
            alt={trip.destination}
            onError={handleImageError}
          />
          <div className={styles.tripStatus}>{trip.status}</div>
        </div>
        <div className={styles.tripContent}>
          <h3 className={styles.destination}>
            <FaMapMarkerAlt /> {trip.destination}
          </h3>
          <div className={styles.tripDetails}>
            <div className={styles.dateRange}>
              <FaCalendarAlt />
              <span>{startDate} - {endDate}</span>
            </div>
            <div className={styles.accommodation}>
              <FaHotel />
              <span>{trip.hotel}</span>
            </div>
            <div className={styles.transport}>
              <FaCarSide />
              <span>{trip.transport}</span>
            </div>
          </div>
          <div className={styles.activities}>
            <h4>Planned Activities:</h4>
            <div className={styles.activityTags}>
              {trip.activities.map((activity, index) => (
                <span key={index} className={styles.activityTag}>{activity}</span>
              ))}
            </div>
          </div>
          <button className={styles.viewDetailsBtn} onClick={() => setSelectedTrip(trip)}>
            View Details
          </button>
        </div>
      </div>
    );
  };

  const renderTripModal = () => {
    if (!selectedTrip) return null;

    const startDate = new Date(selectedTrip.startDate).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    const endDate = new Date(selectedTrip.endDate).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const handleImageError = (e) => {
      e.target.src = 'https://source.unsplash.com/random/800x600/?travel'; // Fallback image
    };

    return (
      <div className={styles.modalOverlay} onClick={() => setSelectedTrip(null)}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <button className={styles.closeBtn} onClick={() => setSelectedTrip(null)}>
            <FaTimes />
          </button>
          
          <div className={styles.modalImage}>
            <img 
              src={selectedTrip.image} 
              alt={selectedTrip.destination}
              onError={handleImageError}
            />
            <h2>{selectedTrip.destination}</h2>
          </div>

          <div className={styles.modalContent}>
            <div className={styles.modalSection}>
              <h3><FaCalendarAlt /> Trip Duration</h3>
              <p>From: {startDate}</p>
              <p>To: {endDate}</p>
            </div>

            <div className={styles.modalSection}>
              <h3><FaPassport /> Booking Details</h3>
              <p><strong>Booking ID:</strong> {selectedTrip.bookingDetails.bookingId}</p>
              <p><strong>Guests:</strong> {selectedTrip.bookingDetails.guests}</p>
              <p><strong>Room Type:</strong> {selectedTrip.bookingDetails.roomType}</p>
              <p><strong>Meal Plan:</strong> {selectedTrip.bookingDetails.mealPlan}</p>
            </div>

            <div className={styles.modalSection}>
              <h3><FaPlane /> Flight Information</h3>
              <p><strong>Flight Number:</strong> {selectedTrip.bookingDetails.flightNo}</p>
              <p><strong>Departure:</strong> {selectedTrip.bookingDetails.departureTime}</p>
              <p><strong>Arrival:</strong> {selectedTrip.bookingDetails.arrivalTime}</p>
            </div>

            <div className={styles.modalSection}>
              <h3><FaStar /> Trip Highlights</h3>
              <ul className={styles.highlightsList}>
                {selectedTrip.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className={styles.modalSection}>
              <h3><FaMoneyBillWave /> Price</h3>
              <p className={styles.price}>{selectedTrip.bookingDetails.price}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.tripsContainer}>
      <div className={styles.header}>
        <h1>My Trips</h1>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'upcoming' ? styles.active : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Trips
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'ongoing' ? styles.active : ''}`}
            onClick={() => setActiveTab('ongoing')}
          >
            Ongoing Trips
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'past' ? styles.active : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Trips
          </button>
        </div>
      </div>

      <div className={styles.tripsList}>
        {trips[activeTab].length > 0 ? (
          trips[activeTab].map((trip) => (
            <div
              key={trip.id}
              className={styles.tripCard}
              onClick={() => setSelectedTrip(trip)}
            >
              <div className={styles.tripImage} style={{ backgroundImage: `url(${trip.image})` }}>
                <span className={styles.tripStatus}>{trip.status}</span>
              </div>
              <div className={styles.tripInfo}>
                <h3>{trip.destination}</h3>
                <p><FaCalendarAlt /> {trip.startDate} - {trip.endDate}</p>
                <p><FaMapMarkerAlt /> {trip.location}</p>
                <div className={styles.tripDetails}>
                  <span><FaHotel /> {trip.hotel}</span>
                  <span><FaPlane /> {trip.transport}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noTrips}>
            <p>No {activeTab} trips found</p>
          </div>
        )}
      </div>

      {selectedTrip && renderTripModal()}
    </div>
  );
};

export default Trips; 