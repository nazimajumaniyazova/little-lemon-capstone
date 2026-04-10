import React, { useReducer, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import ConfirmedBooking from './ConfirmedBooking';
import { fetchAPI, submitAPI } from '../api';

// Today's date in YYYY-MM-DD form (matches HTML date input value).
const todayISO = () => new Date().toISOString().split('T')[0];

// Reducer for available booking times.
// Action shape: { type: 'UPDATE_TIMES', date: 'YYYY-MM-DD' }
export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return fetchAPI(action.date);
    default:
      return state;
  }
};

// Initial state — pulled from the mock API for today.
export const initializeTimes = () => fetchAPI(todayISO());

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, undefined, initializeTimes);
  const navigate = useNavigate();

  // Memoize so child components don't re-render needlessly.
  const submitForm = useCallback(
    (formData) => {
      if (submitAPI(formData)) {
        navigate('/confirmed', { state: { booking: formData } });
      }
    },
    [navigate]
  );

  return (
    <main id="main-content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          }
        />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
        {/* Stub routes so the nav links resolve. */}
        <Route path="/about" element={<HomePage />} />
        <Route path="/menu" element={<HomePage />} />
        <Route path="/order" element={<HomePage />} />
        <Route path="/login" element={<HomePage />} />
      </Routes>
    </main>
  );
}

export default Main;
