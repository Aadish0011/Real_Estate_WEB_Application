import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>V.K. Real Estate</h3>
            <p>Your trusted partner in finding your dream home. We specialize in luxury properties and exceptional service.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/properties">Properties</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Buy a Home</a></li>
              <li><a href="#">Sell a Home</a></li>
              <li><a href="#">Rent a Property</a></li>
              <li><a href="#">Property Management</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul>
              <li>👤 Partner: Mr. Vikas Kapoor</li>
              <li>📍 7A/42 W.E.A Karol Bagh, New Delhi-110005</li>
              <li>📞 +91 9811707082</li>
              <li>✉️ Estatesvk@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 V.K. Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

