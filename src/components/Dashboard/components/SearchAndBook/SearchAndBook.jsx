import React, { useState } from 'react';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaHotel, FaPlane, FaCar, FaUmbrellaBeach, FaWallet } from 'react-icons/fa';
import styles from './SearchAndBook.module.css';
import SmartSearch from './components/SmartSearch/SmartSearch';
import BookingForm from './components/BookingForm/BookingForm';
import RouteOptions from './components/RouteOptions/RouteOptions';
import CostComparison from './components/CostComparison/CostComparison';
import TravelBundles from './components/TravelBundles/TravelBundles';
import BookingManagement from './components/BookingManagement/BookingManagement';
import StandardPackages from './components/StandardPackages/StandardPackages';
import CustomizedBooking from './components/CustomizedBooking/CustomizedBooking';
import UnifiedSearch from './components/Common/UnifiedSearch';
import PaymentSystem from './components/PaymentSystem/PaymentSystem';
import BookingConfirmation from './components/BookingConfirmation/BookingConfirmation';
import { useNavigate } from 'react-router-dom';

const SearchAndBook = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('standard');
  const [searchFilters, setSearchFilters] = useState({
    destination: '',
    budget: '',
    interests: []
  });

  const [customBooking, setCustomBooking] = useState({
    startDate: '',
    endDate: '',
    destination: '',
    guests: 1,
    accommodation: 'hotel',
    transport: 'flight',
    activities: [],
    budget: ''
  });

  const [searchResults, setSearchResults] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock data for travel bundles
  const travelBundles = [
    {
      id: 1,
      type: 'Budget',
      description: 'Perfect for backpackers and budget travelers',
      includes: ['Economy flights', 'Budget hotels', 'Local transport'],
      price: '₹25,000'
    },
    {
      id: 2,
      type: 'Luxury',
      description: 'Premium travel experience with top-notch services',
      includes: ['Business class flights', '5-star hotels', 'Private transfers'],
      price: '₹85,000'
    },
    {
      id: 3,
      type: 'Adventure',
      description: 'Exciting activities and unique experiences',
      includes: ['Mixed transport', 'Adventure resorts', 'Guided activities'],
      price: '₹45,000'
    },
    {
      id: 4,
      type: 'Family',
      description: 'Comfortable and convenient family travel',
      includes: ['Direct flights', 'Family rooms', 'Private transfers'],
      price: '₹65,000'
    }
  ];

  const interests = [
    'Beach', 'Mountains', 'Culture', 'Adventure', 'Wildlife',
    'Food', 'History', 'Shopping', 'Relaxation', 'Nature'
  ];

  const activities = [
    'City Tours', 'Hiking', 'Water Sports', 'Cultural Shows',
    'Food Tours', 'Adventure Sports', 'Wildlife Safari', 'Museum Visits'
  ];

  const handleSearchFilterChange = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCustomBookingChange = (field, value) => {
    setCustomBooking(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestToggle = (interest) => {
    setSearchFilters(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleActivityToggle = (activity) => {
    setCustomBooking(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to search for trips
    // For now, we'll just navigate to the results page
    navigate('/search-results', { state: { searchParams: { ...searchFilters, startDate: customBooking.startDate, endDate: customBooking.endDate, guests: customBooking.guests, budget: customBooking.budget } } });
  };

  const handleCustomRequest = () => {
    console.log('Requesting custom itinerary:', customBooking);
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setSelectedBundle(null);
    setSelectedPackage(null);
  };

  const handleBundleSelect = (bundle) => {
    setSelectedBundle(bundle);
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setSelectedRoute(null);
    setBookingDetails({
      type: 'standard',
      package: pkg,
      totalAmount: pkg.price
    });
  };

  const handleCustomizeComplete = (customData) => {
    setBookingDetails({
      type: 'custom',
      ...customData,
      totalAmount: calculateCustomPrice(customData)
    });
    setShowPayment(true);
  };

  const handlePaymentComplete = (paymentDetails) => {
    // Handle successful payment
    console.log('Payment completed:', paymentDetails);
    
    // Update booking details with payment information
    setBookingDetails({
      ...bookingDetails,
      paymentDetails,
      status: 'confirmed',
      bookingId: paymentDetails.bookingId
    });
    
    // Show success state
    setShowPayment(false);
    setShowSuccess(true);
    setSelectedBundle(null);
    setSelectedRoute(null);
    setSelectedPackage(null);
  };

  const calculateCustomPrice = (customData) => {
    // Implement your pricing logic here
    return 50000; // Placeholder
  };

  const handlePlanTrip = (tripData) => {
    console.log('Planning trip with data:', tripData);
    
    // Get existing trips from localStorage
    const existingTrips = JSON.parse(localStorage.getItem('userTrips') || '{"upcoming":[],"ongoing":[],"past":[]}');
    console.log('Existing trips:', existingTrips);
    
    // Create a complete trip object with all required fields
    const newTrip = {
      id: Date.now(),
      destination: tripData.destination,
      startDate: tripData.startDate,
      endDate: tripData.endDate,
      image: 'https://source.unsplash.com/random/800x600/?travel', // Using Unsplash's random travel image
      location: tripData.location || tripData.destination,
      hotel: tripData.hotel || 'To be confirmed',
      transport: tripData.transport || 'To be confirmed',
      status: 'Upcoming',
      activities: tripData.activities || [],
      highlights: tripData.highlights || [],
      bookingDetails: {
        bookingId: `TRP${Date.now()}`,
        price: tripData.price || '₹0',
        guests: tripData.guests || 1,
        roomType: tripData.roomType || 'Standard',
        mealPlan: tripData.mealPlan || 'Not Included',
        flightNo: tripData.flightNo || 'To be confirmed',
        departureTime: tripData.departureTime || 'To be confirmed',
        arrivalTime: tripData.arrivalTime || 'To be confirmed'
      }
    };
    console.log('New trip to be added:', newTrip);

    // Add the new trip to upcoming trips
    existingTrips.upcoming.push(newTrip);
    console.log('Updated trips:', existingTrips);
    
    // Save updated trips to localStorage
    localStorage.setItem('userTrips', JSON.stringify(existingTrips));
    console.log('Saved to localStorage');
    
    // Wait for a short time to ensure localStorage is updated
    setTimeout(() => {
      // Navigate to trips page
      navigate('/trips');
    }, 100);
  };

  return (
    <div className={styles.searchAndBookContainer}>
      <div className={styles.header}>
        <h1>Search & Book Your Perfect Trip</h1>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'standard' ? styles.active : ''}`}
            onClick={() => setActiveTab('standard')}
          >
            Standard Packages
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'custom' ? styles.active : ''}`}
            onClick={() => setActiveTab('custom')}
          >
            Customized Booking
          </button>
        </div>
      </div>

      {/* Unified Search Section */}
      <section className={styles.section}>
        <UnifiedSearch onSearch={handleSearch} />
      </section>

      {/* Main Content Section */}
      <div className={styles.mainContent}>
        {activeTab === 'standard' ? (
          <>
            {/* Standard Packages Section */}
            <section className={styles.section}>
              <StandardPackages
                onPackageSelect={handlePackageSelect}
                selectedPackage={selectedPackage}
              />
            </section>

            {/* Travel Bundles Section */}
            {!selectedPackage && (
              <section className={styles.section}>
                <TravelBundles 
                  bundles={travelBundles} 
                  onBundleSelect={handleBundleSelect}
                />
              </section>
            )}
          </>
        ) : (
          <>
            {/* Customized Booking Section */}
            <section className={styles.section}>
              <CustomizedBooking
                onComplete={handleCustomizeComplete}
                customBooking={customBooking}
                onCustomBookingChange={handleCustomBookingChange}
              />
            </section>
          </>
        )}

        {/* Route Options - Shows when search is performed */}
        {searchResults && (
          <section className={styles.section}>
            <RouteOptions 
              searchResults={searchResults} 
              onRouteSelect={handleRouteSelect}
            />
          </section>
        )}

        {/* Cost Comparison - Shows when a route is selected */}
        {(selectedRoute || selectedPackage) && (
          <section className={styles.section}>
            <CostComparison 
              route={selectedRoute}
              package={selectedPackage}
            />
          </section>
        )}

        {/* Payment System - Shows when a package is selected or custom booking is complete */}
        {(selectedPackage || bookingDetails) && !showPayment && (
          <section className={styles.section}>
            <button 
              className={styles.payNowButton}
              onClick={() => setShowPayment(true)}
            >
              Proceed to Payment
            </button>
          </section>
        )}

        {/* Payment System Modal */}
        {showPayment && (
          <div className={styles.paymentModal}>
            <PaymentSystem
              amount={selectedPackage ? selectedPackage.price : bookingDetails?.totalAmount}
              onPaymentComplete={handlePaymentComplete}
            />
          </div>
        )}

        {/* Booking Management - Shows after successful payment */}
        {bookingDetails && !showPayment && (
          <section className={styles.section}>
            <BookingManagement booking={bookingDetails} />
          </section>
        )}

        {showSuccess && bookingDetails && (
          <div className={styles.successContainer}>
            <BookingConfirmation
              selectedPackage={bookingDetails.package}
              bookingId={bookingDetails.bookingId}
              onClose={() => setShowSuccess(false)}
            />
          </div>
        )}

        {/* Trip Planning Section */}
        <div className={styles.tripPlanning}>
          <h3>Plan a Trip</h3>
          <p>Ready to start your adventure? Plan your perfect trip now!</p>
          <button 
            onClick={() => handlePlanTrip({
              destination: searchFilters.destination || customBooking.destination,
              startDate: customBooking.startDate,
              endDate: customBooking.endDate,
              guests: customBooking.guests,
              price: customBooking.budget || searchFilters.budget,
              image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
              location: searchFilters.destination || customBooking.destination,
              hotel: 'To be confirmed',
              transport: 'To be confirmed',
              activities: customBooking.activities || [],
              highlights: ['Scenic views', 'Local cuisine', 'Cultural experiences'],
              flightNo: 'To be confirmed',
              departureTime: 'To be confirmed',
              arrivalTime: 'To be confirmed'
            })}
            className={styles.planTripBtn}
          >
            <FaPlane /> Plan This Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndBook; 