import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="app-footer" aria-labelledby="footer-title">
      <div className="container">
        <div>
          <h4 id="footer-title">Little Lemon</h4>
          <p>Mediterranean cuisine with a modern twist.</p>
        </div>
        <nav aria-label="Footer navigation">
          <h4>Doormat Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/booking">Reservations</Link></li>
            <li><Link to="/order">Order Online</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
        <address>
          <h4>Contact</h4>
          <ul>
            <li>123 Olive St.</li>
            <li>Chicago, IL 60601</li>
            <li>(312) 555-0199</li>
            <li>hello@littlelemon.com</li>
          </ul>
        </address>
        <div>
          <h4>Social</h4>
          <ul>
            <li><a href="https://facebook.com">Facebook</a></li>
            <li><a href="https://instagram.com">Instagram</a></li>
            <li><a href="https://twitter.com">Twitter</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
