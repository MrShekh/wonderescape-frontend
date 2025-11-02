import React, { useState } from 'react';
import styles from './BookingManagement.module.css';
import { FaEdit, FaTrash, FaCalendarAlt, FaMapMarkerAlt, FaUser, FaInfoCircle } from 'react-icons/fa';

const BookingManagement = () => {
  // Mock data for existing bookings
  const [bookings, setBookings] = useState([
    {
      id: 1,
      destination: 'Manali',
      startDate: '2024-04-15',
      endDate: '2024-04-20',
      travelers: 2,
      status: 'Confirmed',
      type: 'Luxury Package',
      price: 45000
    },
    {
      id: 2,
      destination: 'Goa',
      startDate: '2024-05-01',
      endDate: '2024-05-05',
      travelers: 4,
      status: 'Pending',
      type: 'Beach Holiday',
      price: 35000
    }
  ]);

  const handleModify = (bookingId) => {
    // Implement modification logic
    console.log('Modifying booking:', bookingId);
  };

  const handleCancel = (bookingId) => {
    // Implement cancellation logic
    const confirmed = window.confirm('Are you sure you want to cancel this booking?');
    if (confirmed) {
      setBookings(bookings.filter(booking => booking.id !== bookingId));
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return '#00b894';
      case 'pending':
        return '#f39c12';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#718096';
    }
  };

  return (
    <div className={styles.bookingManagementContainer}>
      {bookings.length === 0 ? (
        <div className={styles.noBookings}>
          <FaInfoCircle />
          <p>No bookings found</p>
          <button className={styles.newBookingButton}>Plan a Trip</button>
        </div>
      ) : (
        <div className={styles.bookingsList}>
          {bookings.map((booking) => (
            <div key={booking.id} className={styles.bookingCard}>
              <div className={styles.bookingHeader}>
                <h3>{booking.destination}</h3>
                <span 
                  className={styles.status}
                  style={{ backgroundColor: getStatusColor(booking.status) }}
                >
                  {booking.status}
                </span>
              </div>

              <div className={styles.bookingDetails}>
                <div className={styles.detail}>
                  <FaCalendarAlt />
                  <span>{booking.startDate} - {booking.endDate}</span>
                </div>
                <div className={styles.detail}>
                  <FaMapMarkerAlt />
                  <span>{booking.type}</span>
                </div>
                <div className={styles.detail}>
                  <FaUser />
                  <span>{booking.travelers} Travelers</span>
                </div>
                <div className={styles.price}>
                  ₹{booking.price.toLocaleString()}
                </div>
              </div>

              <div className={styles.bookingActions}>
                <button 
                  className={styles.modifyButton}
                  onClick={() => handleModify(booking.id)}
                >
                  <FaEdit /> Modify
                </button>
                <button 
                  className={styles.cancelButton}
                  onClick={() => handleCancel(booking.id)}
                >
                  <FaTrash /> Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingManagement; 