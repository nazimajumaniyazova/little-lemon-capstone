import React from 'react';
import { useNavigate } from 'react-router-dom';

// Hero / call-to-action section on the homepage
function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div>
          <h1 id="hero-title">Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            We are a family-owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>
          <button
            type="button"
            onClick={() => navigate('/booking')}
            aria-label="Reserve a table"
          >
            Reserve a Table
          </button>
        </div>
        <div
          className="hero-placeholder"
          role="img"
          aria-label="Photo of a Mediterranean dish"
        >
          Mediterranean Cuisine
        </div>
      </div>
    </section>
  );
}

export default Hero;
