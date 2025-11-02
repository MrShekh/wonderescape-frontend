import React, { useState } from 'react';
import styles from './BookingConfirmation.module.css';
import { FaCheck, FaCreditCard, FaDownload, FaEnvelope, FaHome, FaList, FaPlus, FaReceipt, FaFilePdf } from 'react-icons/fa';
import PaymentSystem from '../PaymentSystem/PaymentSystem';

const BookingConfirmation = ({ selectedPackage, onClose, onPaymentComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [addOns, setAddOns] = useState({
    airportPickup: false,
    sightseeing: false,
    mealPlan: false
  });
  const [travelerDetails, setTravelerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfTravelers: 1
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [bookingId, setBookingId] = useState('');

  const handleAddOnToggle = (addon) => {
    setAddOns(prev => ({
      ...prev,
      [addon]: !prev[addon]
    }));
  };

  const handleTravelerDetailsChange = (e) => {
    const { name, value } = e.target;
    setTravelerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    let total = selectedPackage.price;
    if (addOns.airportPickup) total += 1500;
    if (addOns.sightseeing) total += 3000;
    if (addOns.mealPlan) total += 2500;
    return total;
  };

  const handleProceedToPayment = () => {
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (paymentDetails) => {
    // Set the booking ID from payment details
    setBookingId(paymentDetails.bookingId);
    
    // Move to success step
    setCurrentStep(3);
    
    // Call the parent's onPaymentComplete with all details
    onPaymentComplete && onPaymentComplete({
      bookingId: paymentDetails.bookingId,
      package: selectedPackage,
      addOns,
      travelerDetails,
      totalAmount: calculateTotal() * 1.18, // Include GST
      paymentDetails
    });
  };

  const renderStep1 = () => (
    <div className={styles.step}>
      <h2>Package Summary</h2>
      <div className={styles.packageDetails}>
        <h3>{selectedPackage.name}</h3>
        <p className={styles.destination}>{selectedPackage.destination}</p>
        
        <div className={styles.itinerary}>
          <h4>Itinerary Overview</h4>
          <ul>
            <li>Duration: {selectedPackage.duration}</li>
            <li>Hotels: {selectedPackage.hotels}</li>
            <li>Activities: {selectedPackage.activities.join(', ')}</li>
            <li>Transport: {selectedPackage.transport}</li>
          </ul>
        </div>

        <div className={styles.addOns}>
          <h4>Optional Add-ons</h4>
          <div className={styles.addOnItem}>
            <label>
              <input
                type="checkbox"
                checked={addOns.airportPickup}
                onChange={() => handleAddOnToggle('airportPickup')}
              />
              Airport Pickup (₹1,500)
            </label>
          </div>
          <div className={styles.addOnItem}>
            <label>
              <input
                type="checkbox"
                checked={addOns.sightseeing}
                onChange={() => handleAddOnToggle('sightseeing')}
              />
              Additional Sightseeing (₹3,000)
            </label>
          </div>
          <div className={styles.addOnItem}>
            <label>
              <input
                type="checkbox"
                checked={addOns.mealPlan}
                onChange={() => handleAddOnToggle('mealPlan')}
              />
              Full Meal Plan (₹2,500)
            </label>
          </div>
        </div>

        <div className={styles.travelerDetails}>
          <h4>Traveler Details</h4>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={travelerDetails.name}
                onChange={handleTravelerDetailsChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={travelerDetails.email}
                onChange={handleTravelerDetailsChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={travelerDetails.phone}
                onChange={handleTravelerDetailsChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="numberOfTravelers">Number of Travelers</label>
              <input
                type="number"
                id="numberOfTravelers"
                name="numberOfTravelers"
                min="1"
                value={travelerDetails.numberOfTravelers}
                onChange={handleTravelerDetailsChange}
                required
              />
            </div>
          </div>
        </div>

        <div className={styles.costBreakdown}>
          <h4>Cost Breakdown</h4>
          <div className={styles.costItem}>
            <span>Base Package Price:</span>
            <span>₹{selectedPackage.price.toLocaleString()}</span>
          </div>
          {addOns.airportPickup && (
            <div className={styles.costItem}>
              <span>Airport Pickup:</span>
              <span>₹1,500</span>
            </div>
          )}
          {addOns.sightseeing && (
            <div className={styles.costItem}>
              <span>Additional Sightseeing:</span>
              <span>₹3,000</span>
            </div>
          )}
          {addOns.mealPlan && (
            <div className={styles.costItem}>
              <span>Full Meal Plan:</span>
              <span>₹2,500</span>
            </div>
          )}
          <div className={styles.costItem}>
            <span>Taxes (18% GST):</span>
            <span>₹{(calculateTotal() * 0.18).toLocaleString()}</span>
          </div>
          <div className={styles.costTotal}>
            <span>Total Amount:</span>
            <span>₹{(calculateTotal() * 1.18).toLocaleString()}</span>
          </div>
        </div>

        <div className={styles.cancellationPolicy}>
          <h4>Cancellation & Refund Policy</h4>
          <ul>
            <li>Free cancellation up to 7 days before the trip</li>
            <li>50% refund for cancellation between 3-7 days</li>
            <li>No refund for cancellation within 3 days</li>
          </ul>
        </div>

        <div className={styles.actions}>
          <button className={styles.modifyButton} onClick={() => setCurrentStep(1)}>
            <FaPlus /> Modify Add-ons
          </button>
          <button className={styles.proceedButton} onClick={handleProceedToPayment}>
            <FaCreditCard /> Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className={styles.step}>
      <h2>Payment</h2>
      <PaymentSystem
        amount={calculateTotal()}
        promoCode={promoCode}
        onPromoCodeChange={(code) => setPromoCode(code)}
        onPaymentComplete={handlePaymentSubmit}
        bookingDetails={{
          package: selectedPackage,
          addOns,
          travelerDetails
        }}
      />
    </div>
  );

  const renderStep3 = () => (
    <div className={styles.step}>
      <div className={styles.successMessage}>
        <FaCheck className={styles.successIcon} />
        <h2>Booking Successful!</h2>
        <p>Your booking has been confirmed</p>
      </div>

      <div className={styles.bookingDetails}>
        <div className={styles.bookingId}>
          <span className={styles.label}>Booking ID:</span>
          <span className={styles.value}>{bookingId}</span>
        </div>
        <div className={styles.confirmationMessage}>
          <FaEnvelope className={styles.messageIcon} />
          <p>A confirmation email has been sent to {travelerDetails.email}</p>
        </div>
      </div>

      <div className={styles.downloadOptions}>
        <button className={styles.downloadButton}>
          <FaFilePdf /> Download Itinerary PDF
        </button>
      </div>

      <div className={styles.finalActions}>
        <button className={styles.viewTripsButton}>
          <FaList /> View in My Trips
        </button>
        <button className={styles.homeButton} onClick={onClose}>
          <FaHome /> Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.bookingConfirmation}>
      <div className={styles.progressBar}>
        <div className={`${styles.progressStep} ${currentStep >= 1 ? styles.active : ''}`}>
          Package Summary
        </div>
        <div className={`${styles.progressStep} ${currentStep >= 2 ? styles.active : ''}`}>
          Payment
        </div>
        <div className={`${styles.progressStep} ${currentStep >= 3 ? styles.active : ''}`}>
          Confirmation
        </div>
      </div>

      <div className={styles.stepContent}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default BookingConfirmation; 