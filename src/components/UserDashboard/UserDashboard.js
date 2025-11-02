import React, { useState } from 'react';
import { FaUser, FaPlane, FaHotel, FaCalendarAlt, FaHeart, FaBell } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('bookings');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      message: 'Your flight to Paris has been confirmed',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'reminder',
      message: 'Upcoming hotel check-in tomorrow',
      time: '5 hours ago',
      read: false
    }
  ]);

  const bookings = [
    {
      id: 1,
      type: 'flight',
      destination: 'Paris, France',
      date: '2024-04-15',
      status: 'confirmed',
      bookingId: 'BK123456',
      price: 299
    },
    {
      id: 2,
      type: 'hotel',
      destination: 'Grand Hotel, Paris',
      date: '2024-04-15',
      status: 'confirmed',
      bookingId: 'BK123457',
      price: 199
    }
  ];

  const wishlist = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      type: 'destination',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4'
    },
    {
      id: 2,
      name: 'Swiss Alps',
      type: 'destination',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'
    }
  ];

  const handleCancelBooking = (bookingId) => {
    // Implement booking cancellation logic
    alert(`Booking ${bookingId} cancelled successfully`);
  };

  const handleRemoveFromWishlist = (itemId) => {
    // Implement wishlist removal logic
    alert(`Item removed from wishlist`);
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="user-profile">
          <div className="profile-image">
            <FaUser />
          </div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>

        <nav className="dashboard-nav">
          <button
            className={`nav-button ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <FaPlane /> My Bookings
          </button>
          <button
            className={`nav-button ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <FaHeart /> Wishlist
          </button>
          <button
            className={`nav-button ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <FaBell /> Notifications
          </button>
        </nav>
      </div>

      <div className="dashboard-main">
        {activeTab === 'bookings' && (
          <div className="bookings-section">
            <h2>My Bookings</h2>
            <div className="bookings-grid">
              {bookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-icon">
                    {booking.type === 'flight' ? <FaPlane /> : <FaHotel />}
                  </div>
                  <div className="booking-info">
                    <h3>{booking.destination}</h3>
                    <p><FaCalendarAlt /> {booking.date}</p>
                    <p>Booking ID: {booking.bookingId}</p>
                    <p className="price">${booking.price}</p>
                  </div>
                  <div className="booking-status">
                    <span className={`status-badge ${booking.status}`}>
                      {booking.status}
                    </span>
                    <button
                      className="cancel-button"
                      onClick={() => handleCancelBooking(booking.bookingId)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="wishlist-section">
            <h2>My Wishlist</h2>
            <div className="wishlist-grid">
              {wishlist.map(item => (
                <div key={item.id} className="wishlist-card">
                  <img src={item.image} alt={item.name} />
                  <div className="wishlist-info">
                    <h3>{item.name}</h3>
                    <p>{item.type}</p>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="notifications-section">
            <h2>Notifications</h2>
            <div className="notifications-list">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.read ? 'read' : ''}`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    {notification.type === 'booking' ? <FaPlane /> : <FaBell />}
                  </div>
                  <div className="notification-content">
                    <p>{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard; 