import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function ConfirmedBooking() {
  const { state } = useLocation();
  const booking = state?.booking;

  return (
    <section className="booking-page" aria-labelledby="confirmed-title">
      <div className="container">
        <div className="confirmed">
          <h1 id="confirmed-title">Booking confirmed!</h1>
          <p>Thanks — your table at Little Lemon is reserved.</p>
          {booking && (
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 24 }}>
              <li><strong>Date:</strong> {booking.date}</li>
              <li><strong>Time:</strong> {booking.time}</li>
              <li><strong>Guests:</strong> {booking.guests}</li>
              <li><strong>Occasion:</strong> {booking.occasion}</li>
            </ul>
          )}
          <p style={{ marginTop: 24 }}>
            <Link to="/">← Back to home</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default ConfirmedBooking;
