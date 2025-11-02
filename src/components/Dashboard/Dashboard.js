import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaPlane, FaHotel, FaMapMarkedAlt, FaHeart, FaGift, FaCar, FaUser, FaHeadset, FaBook, FaSuitcase } from 'react-icons/fa';
import styles from './Dashboard.module.css';

// Import components
import Home from './components/Home/Home';
import SearchAndBook from './components/SearchAndBook/SearchAndBook';
import Wishlist from './components/Wishlist/Wishlist';
import DealsAndOffers from './components/DealsAndOffers/DealsAndOffers';
import CabAndActivities from './components/CabAndActivities/CabAndActivities';
import Trips from './components/Trips/Trips';
import Profile from './components/Profile/Profile';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('transport');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      // If no user data is found, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const isActive = (path) => {
    const currentPath = location.pathname;
    // Exact match for dashboard home
    if (path === '/dashboard') {
      return currentPath === '/dashboard';
    }
    // For other routes, check exact match
    return currentPath === path;
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <nav className={styles.sidebarNav}>
          <Link
            to="/dashboard"
            className={`${styles.navItem} ${isActive('/dashboard') ? styles.active : ''}`}
          >
            <FaHome /> Home
          </Link>
          <Link
            to="/dashboard/searchandbook"
            className={`${styles.navItem} ${isActive('/dashboard/searchandbook') ? styles.active : ''}`}
          >
            <FaPlane /> Search & Book
          </Link>
          <Link
            to="/dashboard/trips"
            className={`${styles.navItem} ${isActive('/dashboard/trips') ? styles.active : ''}`}
          >
            <FaSuitcase /> My Trips
          </Link>
          <Link
            to="/dashboard/wishlist"
            className={`${styles.navItem} ${isActive('/dashboard/wishlist') ? styles.active : ''}`}
          >
            <FaHeart /> Wishlist
          </Link>
          <Link
            to="/dashboard/dealsandoffers"
            className={`${styles.navItem} ${isActive('/dashboard/dealsandoffers') ? styles.active : ''}`}
          >
            <FaGift /> Deals & Offers
          </Link>
          <Link
            to="/dashboard/cabandactivities"
            className={`${styles.navItem} ${isActive('/dashboard/cabandactivities') ? styles.active : ''}`}
          >
            <FaCar /> Cab & Activities
          </Link>
          <Link
            to="/dashboard/profile"
            className={`${styles.navItem} ${isActive('/dashboard/profile') ? styles.active : ''}`}
          >
            <FaUser /> Profile
          </Link>
          {/* <Link
            to="/dashboard/support"
            className={`${styles.navItem} ${isActive('/dashboard/support') ? styles.active : ''}`}
          >
            <FaHeadset /> Support
          </Link> */}
          {/* <Link
            to="/dashboard/guide"
            className={`${styles.navItem} ${isActive('/dashboard/guide') ? styles.active : ''}`}
          >
            <FaBook /> Travel Guide
          </Link> */}
        </nav>
      </div>

      <div className={styles.mainContent}>
        <Routes>
          <Route index element={<Home userData={userData} />} />
          <Route path="searchandbook/*" element={<SearchAndBook />} />
          <Route path="trips" element={<Trips />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="dealsandoffers" element={<DealsAndOffers />} />
          <Route path="cabandactivities" element={<CabAndActivities />} />
          <Route path="profile" element={<Profile />} />
          <Route path="support" element={<div>Support Component</div>} />
          <Route path="guide" element={<div>Travel Guide Component</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
