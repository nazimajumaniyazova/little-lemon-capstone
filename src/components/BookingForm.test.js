import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm, { validateField, validateForm } from './BookingForm';
import { initializeTimes, updateTimes } from './Main';
import { fetchAPI } from '../api';

// ---- Reducer / initializer tests ------------------------------------------

describe('initializeTimes', () => {
  test('returns the non-empty array of times from fetchAPI for today', () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true);
    // fetchAPI is seeded — for any valid date it returns an array.
    expect(times).toEqual(fetchAPI(new Date().toISOString().split('T')[0]));
  });
});

describe('updateTimes reducer', () => {
  test('returns times for the given date on UPDATE_TIMES action', () => {
    const next = updateTimes([], { type: 'UPDATE_TIMES', date: '2030-01-15' });
    expect(next).toEqual(fetchAPI('2030-01-15'));
  });

  test('returns the previous state for unknown actions', () => {
    const prev = ['17:00'];
    expect(updateTimes(prev, { type: 'UNKNOWN' })).toBe(prev);
  });
});

// ---- Validation function tests --------------------------------------------

describe('validateField', () => {
  test('rejects empty date', () => {
    expect(validateField('date', '')).toMatch(/choose a date/i);
  });
  test('rejects past date', () => {
    expect(validateField('date', '2000-01-01')).toMatch(/past/i);
  });
  test('accepts a future date', () => {
    expect(validateField('date', '2999-01-01')).toBe('');
  });
  test('rejects empty time', () => {
    expect(validateField('time', '')).toMatch(/time/i);
  });
  test('rejects fewer than 1 guest', () => {
    expect(validateField('guests', '0')).toMatch(/at least 1/i);
  });
  test('rejects more than 10 guests', () => {
    expect(validateField('guests', '11')).toMatch(/maximum 10/i);
  });
  test('accepts valid guests', () => {
    expect(validateField('guests', '4')).toBe('');
  });
  test('rejects empty occasion', () => {
    expect(validateField('occasion', '')).toMatch(/occasion/i);
  });
});

describe('validateForm', () => {
  test('returns no errors for a fully valid form', () => {
    const errors = validateForm({
      date: '2999-01-01',
      time: '18:00',
      guests: '2',
      occasion: 'Birthday'
    });
    expect(Object.values(errors).every((e) => !e)).toBe(true);
  });
});

// ---- BookingForm rendering / behaviour ------------------------------------

describe('BookingForm', () => {
  const renderForm = (overrides = {}) => {
    const props = {
      availableTimes: ['17:00', '18:00', '19:00'],
      dispatch: jest.fn(),
      submitForm: jest.fn(),
      ...overrides
    };
    return { ...render(<BookingForm {...props} />), props };
  };

  test('renders all required fields with labels (a11y)', () => {
    renderForm();
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reservation/i })).toBeInTheDocument();
  });

  test('available times are rendered as select options', () => {
    renderForm({ availableTimes: ['17:00', '18:00'] });
    expect(screen.getByRole('option', { name: '17:00' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '18:00' })).toBeInTheDocument();
  });

  test('changing the date dispatches UPDATE_TIMES with the new date', () => {
    const { props } = renderForm();
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: '2999-12-31' }
    });
    expect(props.dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_TIMES',
      date: '2999-12-31'
    });
  });

  test('submit button is disabled until the form is valid', () => {
    renderForm();
    const submit = screen.getByRole('button', { name: /reservation/i });
    expect(submit).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: '2999-12-31' }
    });
    fireEvent.change(screen.getByLabelText(/choose time/i), {
      target: { value: '18:00' }
    });
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: '2' }
    });
    fireEvent.change(screen.getByLabelText(/occasion/i), {
      target: { value: 'Birthday' }
    });

    expect(submit).toBeEnabled();
  });

  test('submitForm is called with the form data on a valid submit', () => {
    const { props } = renderForm();
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: '2999-12-31' }
    });
    fireEvent.change(screen.getByLabelText(/choose time/i), {
      target: { value: '19:00' }
    });
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: '4' }
    });
    fireEvent.change(screen.getByLabelText(/occasion/i), {
      target: { value: 'Anniversary' }
    });

    fireEvent.click(screen.getByRole('button', { name: /reservation/i }));

    expect(props.submitForm).toHaveBeenCalledWith({
      date: '2999-12-31',
      time: '19:00',
      guests: '4',
      occasion: 'Anniversary'
    });
  });

  test('shows a validation error after blurring an invalid field', () => {
    renderForm();
    const guests = screen.getByLabelText(/number of guests/i);
    fireEvent.change(guests, { target: { value: '0' } });
    fireEvent.blur(guests);
    expect(screen.getByText(/at least 1 guest/i)).toBeInTheDocument();
  });
});
