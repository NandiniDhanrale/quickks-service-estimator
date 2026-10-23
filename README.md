# Quickks Service Price Estimator — React

A React + Vite app for the Quickks React Intern onboarding assignment.

## Requirements

- Electrician ₹300/hr, Plumber ₹250/hr, Carpenter ₹350/hr
- Minimum 1 hour; this implementation assumes whole-number hours
- Emergency booking adds a one-time ₹100 fee
- Clear validation messages for zero, negative, empty, fractional and invalid hours
- Responsive, accessible form with an estimated price breakdown

## Run locally

Node.js 20.19+ or 22.12+ recommended.

```bash
npm install
npm run dev
```

Open the URL displayed by Vite, usually http://localhost:5173.

## Tests and build

```bash
npm test
npm run build
```

## Architecture

- `src/App.jsx`: useState, submission events and conditional rendering
- `src/components/ServiceSelector.jsx`: controlled dropdown
- `src/components/HoursInput.jsx`: controlled hours input and validation feedback
- `src/components/EmergencyBooking.jsx`: controlled checkbox
- `src/components/EstimateResult.jsx`: price breakdown
- `src/utils/pricing.js`: independent price calculation and validation
- `src/main.jsx`: React root; `src/styles.css`: responsive styles
- `tests/pricing.test.js`: pricing and edge-case unit tests

## Deploy to GitHub Pages

The Vite base path is `/quickks-service-estimator/`. The workflow `.github/workflows/deploy.yml` runs tests, builds and publishes `dist/` on pushes to `feature/estimator-nandini`.

In repository **Settings → Pages → Build and deployment**, select **GitHub Actions** rather than **Deploy from a branch**. The expected URL is:

https://nandinidhanrale.github.io/quickks-service-estimator/

Leave **Custom domain** empty. Do not use the personal portfolio domain.

## Scope note

The task title says availability, but no availability logic or schedules were provided. This implementation is a service **price estimator**, not a real reservation or availability system.
