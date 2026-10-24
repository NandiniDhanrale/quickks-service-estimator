# Quickks Service Price Estimator — React

A React + Vite app for the Quickks React Intern onboarding assignment.

## Tech Stack

![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Test_Runner-339933?logo=nodedotjs&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-222222?logo=github&logoColor=white)

| Layer | Technology | Purpose |
| --- | --- | --- |
| UI framework | **React 19** | JSX components, props, and `useState` |
| Build tooling | **Vite 7** | Development server and optimized production bundle |
| Application logic | **JavaScript (ES modules)** | Pricing and input validation |
| Styling | **CSS3** | Responsive layout |
| Page shell | **HTML5** | App entry point |
| Testing | **Node.js built-in test runner** | Pricing unit tests |
| Hosting | **GitHub Pages + GitHub Actions** | Automated static deployment |

> **About GitHub's Languages chart:** React is a JavaScript library, not a separate programming language. GitHub counts most `.jsx` files as JavaScript, so seeing JavaScript, HTML and CSS in the Languages section is expected even for this React app.

## Requirements

- Electrician ₹300/hr, Plumber ₹250/hr, Carpenter ₹350/hr
- Minimum 1 hour and maximum **24 hours** (documented assumption; whole hours only)
- Emergency booking adds a one-time ₹100 fee
- Clear validation messages for zero, negative, empty, fractional and invalid hours
- Detailed price breakdown: service, hourly rate, working hours, subtotal, emergency fee, and total
- Service names and rates are kept in one `SERVICES` catalog
- Responsive, accessible form

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

The Vite base path is `/quickks-service-estimator/`. The workflow `.github/workflows/deploy.yml` runs tests, builds and publishes `dist/` on pushes to `main`.

In repository **Settings → Pages → Build and deployment**, select **GitHub Actions** rather than **Deploy from a branch**. The expected URL is:

https://nandinidhanrale.github.io/quickks-service-estimator/

## Scope note

The task title says availability, but no availability logic or schedules were provided. This implementation is a service **price estimator**, not a real reservation or availability system.
