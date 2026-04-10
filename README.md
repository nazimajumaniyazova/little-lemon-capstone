# Little Lemon — Front-end Capstone Project

A React web app for the **Little Lemon** restaurant, built as the capstone
project for the Meta Front-End Developer Professional Certificate. The app
lets visitors browse the homepage and reserve a table through a fully
validated booking form.

## Features

- Responsive, semantic, accessible homepage (Header, Hero, Specials,
  Testimonials, About, Footer).
- Reserve-a-table page with a controlled `BookingForm`.
- `useReducer`-based available-times state, updated based on the chosen date
  via the (mocked) `fetchAPI` provided by Meta.
- Client-side form validation with inline error messages and disabled submit
  until the form is valid.
- Confirmation page after a successful submission via `submitAPI`.
- Unit tests covering the reducer, the validation rules, and the form
  rendering / interactions (React Testing Library + Jest).
- Skip-to-content link, ARIA attributes, focus styles, and labelled form
  controls for accessibility.
- Routing with `react-router-dom` v6.

## Tech stack

- **React 18** (Create React App)
- **react-router-dom 6** for routing
- **@testing-library/react** + **Jest** for tests
- Plain CSS with custom properties (no CSS framework)

## Project structure

```
capstone project/
├── public/
│   └── index.html              # HTML shell with meta + Open Graph tags
├── src/
│   ├── api.js                  # Mock fetchAPI / submitAPI
│   ├── App.js                  # Top-level layout
│   ├── App.css                 # Component styles
│   ├── index.js                # Entry point — wraps App in BrowserRouter
│   ├── index.css               # Design tokens & global styles
│   ├── setupTests.js           # @testing-library/jest-dom setup
│   └── components/
│       ├── Header.js
│       ├── Nav.js
│       ├── Hero.js
│       ├── Specials.js
│       ├── SpecialCard.js
│       ├── Testimonials.js
│       ├── About.js
│       ├── Footer.js
│       ├── HomePage.js
│       ├── Main.js             # Routing + useReducer for availableTimes
│       ├── BookingPage.js
│       ├── BookingForm.js      # Controlled form with validation
│       ├── BookingForm.test.js # Unit tests
│       └── ConfirmedBooking.js
├── package.json
├── .gitignore
└── README.md
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) **16+** and npm

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:3000)
npm start

# 3. Run the tests
npm test

# 4. Build for production
npm run build
```

## Booking flow

1. The user navigates to **Reservations** from the nav bar.
2. They pick a **date**, which dispatches `UPDATE_TIMES` to the reducer in
   `Main.js`. The reducer calls `fetchAPI(date)` and replaces the list of
   available times.
3. They pick a **time**, **guest count** (1–10), and **occasion**.
4. Each field is validated on change & blur. The submit button is disabled
   until every field is valid.
5. On submit, `submitAPI(formData)` is called. If it returns truthy, the user
   is routed to `/confirmed`, where their booking details are displayed.

## Validation rules

| Field    | Rule                                       |
|----------|--------------------------------------------|
| Date     | Required, cannot be in the past            |
| Time     | Required, must be one of the available times |
| Guests   | Required, between 1 and 10                 |
| Occasion | Required (Birthday / Anniversary / Engagement / Other) |

## Accessibility

- Skip-to-content link at the top of the page.
- All form fields are wired to `<label htmlFor>` and use
  `aria-required`, `aria-invalid`, and `aria-describedby` for error messages.
- Inline errors use `role="alert"` so screen readers announce them.
- Visible `:focus-visible` outlines on all interactive elements.
- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<section>`,
  `<article>`, `<address>`, `<footer>`).

## Tests

Run with:

```bash
npm test
```

Test coverage includes:

- `initializeTimes()` returns the seeded times for today.
- `updateTimes` reducer returns new times on `UPDATE_TIMES` and the previous
  state on unknown actions.
- `validateField` / `validateForm` reject invalid values and accept valid
  ones.
- `BookingForm` renders all fields with accessible labels, dispatches on
  date change, disables submit until valid, calls `submitForm` with the
  collected data, and shows inline errors after blur.

## License

Created for educational purposes as part of the Meta Front-End Developer
Professional Certificate capstone.
