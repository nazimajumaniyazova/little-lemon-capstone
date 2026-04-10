import React from 'react';
import BookingForm from './BookingForm';

function BookingPage({ availableTimes, dispatch, submitForm }) {
  return (
    <>
      <section className="booking-header" aria-labelledby="booking-title">
        <div className="container">
          <h1 id="booking-title">Reserve a Table</h1>
          <p>Find your table for any occasion</p>
        </div>
      </section>
      <section className="booking-page">
        <div className="container">
          <BookingForm
            availableTimes={availableTimes}
            dispatch={dispatch}
            submitForm={submitForm}
          />
        </div>
      </section>
    </>
  );
}

export default BookingPage;
