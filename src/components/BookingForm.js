import React, { useState, useMemo } from 'react';

const todayISO = () => new Date().toISOString().split('T')[0];

// Validation rules — kept centralised so they can be unit-tested.
export const validateField = (name, value) => {
  switch (name) {
    case 'date': {
      if (!value) return 'Please choose a date';
      if (value < todayISO()) return 'Date cannot be in the past';
      return '';
    }
    case 'time':
      return value ? '' : 'Please choose a time';
    case 'guests': {
      const n = Number(value);
      if (!value) return 'Please enter the number of guests';
      if (Number.isNaN(n) || n < 1) return 'At least 1 guest is required';
      if (n > 10) return 'Maximum 10 guests per reservation';
      return '';
    }
    case 'occasion':
      return value ? '' : 'Please select an occasion';
    default:
      return '';
  }
};

export const validateForm = (form) =>
  Object.fromEntries(
    Object.entries(form).map(([k, v]) => [k, validateField(k, v)])
  );

const initialForm = {
  date: '',
  time: '',
  guests: '1',
  occasion: ''
};

function BookingForm({ availableTimes = [], dispatch, submitForm }) {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => validateForm(form), [form]);
  const isValid = Object.values(errors).every((e) => !e);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'date') {
      dispatch?.({ type: 'UPDATE_TIMES', date: value });
    }
  };

  const handleBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ date: true, time: true, guests: true, occasion: true });
    if (!isValid) return;
    submitForm?.(form);
  };

  // Helper to get the field-error to render under each input.
  const errFor = (field) => (touched[field] && errors[field] ? errors[field] : '');

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      aria-label="Reserve a table"
      noValidate
    >
      <div>
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          name="date"
          value={form.date}
          min={todayISO()}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={Boolean(errFor('date'))}
          aria-describedby="date-error"
        />
        {errFor('date') && (
          <div className="field-error" id="date-error" role="alert">
            {errFor('date')}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          name="time"
          value={form.time}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={Boolean(errFor('time'))}
          aria-describedby="time-error"
        >
          <option value="">-- Select a time --</option>
          {availableTimes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errFor('time') && (
          <div className="field-error" id="time-error" role="alert">
            {errFor('time')}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          name="guests"
          value={form.guests}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={Boolean(errFor('guests'))}
          aria-describedby="guests-error"
        />
        {errFor('guests') && (
          <div className="field-error" id="guests-error" role="alert">
            {errFor('guests')}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={form.occasion}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={Boolean(errFor('occasion'))}
          aria-describedby="occasion-error"
        >
          <option value="">-- Select an occasion --</option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Engagement">Engagement</option>
          <option value="Other">Other</option>
        </select>
        {errFor('occasion') && (
          <div className="field-error" id="occasion-error" role="alert">
            {errFor('occasion')}
          </div>
        )}
      </div>

      <button type="submit" disabled={!isValid}>
        Make Your Reservation
      </button>
    </form>
  );
}

export default BookingForm;
