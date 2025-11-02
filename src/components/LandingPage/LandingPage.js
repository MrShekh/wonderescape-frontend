import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPlane, FaHotel, FaCar, FaMapMarkedAlt, FaUserFriends, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './LandingPage.css';

const wonders = [
  {
    id: 1,
    name: 'Taj Mahal',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523'
  },
  {
    id: 2,
    name: 'Great Wall of China',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526'
  },
  {
    id: 3,
    name: 'Petra',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526'
  },
  {
    id: 4,
    name: 'Machu Picchu',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526'
  },
  {
    id: 5,
    name: 'Christ the Redeemer',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526'
  },
  {
    id: 6,
    name: 'Colosseum',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526'
  },
  {
    id: 7,
    name: 'Chichen Itza',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526'
  }
];

const LandingPage = () => {
  const [currentWonderIndex, setCurrentWonderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWonderIndex((prevIndex) => (prevIndex + 1) % wonders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const destinations = [
    {
      id: 1,
      name: 'Kerala',
      image: 'http://indiainvites.com/wp-content/uploads/2021/01/1635210-1-1.jpg',
      price: '₹30,000',
      description: 'Experience the serene backwaters and lush greenery of God\'s Own Country.'
    },
    {
      id: 2,
      name: 'Jaipur',
      image: 'https://www.traveldailymedia.com/assets/2019/07/jaipur.jpg',
      price: '₹25,000',
      description: 'Discover the royal heritage and vibrant culture of the Pink City.'
    },
    {
      name: 'Taj Mahal, India',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523',
      price: '₹40,000',
      description: 'The iconic symbol of love and one of the Seven Wonders of the World'
    },
    {
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      price: '₹45,999',
      description: 'Paradise island with pristine beaches and rich culture'
    },
    {
      name: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      price: '₹88,999',
      description: 'City of love and iconic landmarks'
    },
    {
        name: 'Norway',
        image: 'https://www.tom-archer.com/wp-content/uploads/2018/01/aurora_in_lofoten_norway.jpg',
        price: '₹70000',
        description: 'Land of fjords and northern lights'
      },
      
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        {wonders.map((wonder, index) => (
          <div
            key={wonder.id}
            className={`wonder-image ${index === currentWonderIndex ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${wonder.image})`
            }}
          />
        ))}
        <div className="hero-content">
          <h1>Welcome to WanderScape</h1>
          <p>Escape the Ordinary, Wander the Extraordinary</p>
          <div className="search-box">
            <input type="text" placeholder="Where do you want to go?" />
            <button>
              <FaSearch /> Search
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose WanderScape?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaPlane className="feature-icon" />
            <h3>Flights</h3>
            <p>Book flights to destinations worldwide</p>
          </div>
          <div className="feature-card">
            <FaHotel className="feature-icon" />
            <h3>Hotels</h3>
            <p>Find the perfect accommodation</p>
          </div>
          <div className="feature-card">
            <FaCar className="feature-icon" />
            <h3>Transportation</h3>
            <p>Local transport and car rentals</p>
          </div>
          <div className="feature-card">
            <FaMapMarkedAlt className="feature-icon" />
            <h3>Activities</h3>
            <p>Discover local experiences</p>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="destinations-section">
        <h2>Popular Destinations</h2>
        <div className="destinations-grid">
          {destinations.map((destination, index) => (
            <div key={index} className="destination-card">
              <img src={destination.image} alt={destination.name} />
              <div className="destination-info">
                <h3>{destination.name}</h3>
                <p className="price">Starting from {destination.price}</p>
                <p className="description">{destination.description}</p>
                <Link to="/destinations" className="explore-btn">Explore</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of travelers who trust WanderScape for their travel needs</p>
          <Link to="/register" className="cta-button">
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-content">
          <div>
            <h3>About WanderScape</h3>
            <p>Your trusted partner in creating unforgettable travel experiences. We connect travelers with the world's most amazing destinations.</p>
            <div className="social-links">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </div>

          <div>
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/packages">Travel Packages</Link></li>
              <li><Link to="/hotels">Hotels</Link></li>
              <li><Link to="/flights">Flights</Link></li>
              <li><Link to="/activities">Activities</Link></li>
            </ul>
          </div>

          <div>
            <h3>Contact Info</h3>
            <div className="contact-info">
              <p><FaPhone /> +1 234 567 890</p>
              <p><FaEnvelope /> info@wanderscape.com</p>
              <p><FaMapMarkerAlt /> 60 feet road,near krishnaraj lane,Pimple Gurav,Pune, Maharashtra 411061</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 WanderScape. All rights reserved.</p>
          <p>Terms & Conditions | Privacy Policy | Cookie Policy</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 