# Quickks Service Price Estimator

A responsive, browser-based price estimator for Quickks home services.

## Requirements
- Electrician: ₹300/hour
- Plumber: ₹250/hour
- Carpenter: ₹350/hour
- Emergency booking: additional flat ₹100
- Minimum 1 working hour; this implementation accepts whole hours only
- Clear errors for empty, zero, negative, fractional or invalid hours

## Run locally
Open `index.html` in any modern browser. No build step or dependencies required.

## Run automated tests
Install Node.js (v18+ recommended), then run:

```bash
npm test
```

## Project structure
- `index.html`: accessible form and result markup
- `styles.css`: responsive visual styling
- `pricing.js`: independent, testable pricing and validation logic
- `script.js`: browser form events and DOM updates
- `tests/pricing.test.js`: automated business-logic tests

## Calculation
`total = (hourly rate × working hours) + (emergency ? 100 : 0)`

## Scope note
The assignment title mentions availability but supplies no professional schedules, booking times, or availability rules. This implementation provides price estimation only; no availability claims or bookings are made.

## Git branch
`feature/estimator-nandini`
