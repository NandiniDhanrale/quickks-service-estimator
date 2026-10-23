import { useState } from 'react';
import ServiceSelector from './components/ServiceSelector.jsx';
import HoursInput from './components/HoursInput.jsx';
import EmergencyBooking from './components/EmergencyBooking.jsx';
import EstimateResult from './components/EstimateResult.jsx';
import { calculateEstimate } from './utils/pricing.js';

export default function App() {
  const [service, setService] = useState('electrician');
  const [hours, setHours] = useState('1');
  const [emergency, setEmergency] = useState(false);
  const [error, setError] = useState('');
  const [estimate, setEstimate] = useState(null);

  function resetResult() {
    setError('');
    setEstimate(null); // Never leave stale totals when inputs change.
  }
  function handleCalculate(event) {
    event.preventDefault();
    try {
      const result = calculateEstimate(service, hours, emergency);
      setError('');
      setEstimate(result);
    } catch (err) {
      setEstimate(null);
      setError(err.message);
    }
  }
  return (
    <main className="page">
      <section className="card" aria-labelledby="page-title">
        <header className="header">
          <span className="eyebrow">QUICKKS · HOME SERVICES</span>
          <h1 id="page-title">Service Price Estimator</h1>
          <p>Choose a service and see an instant cost estimate.</p>
        </header>
        <form onSubmit={handleCalculate} noValidate>
          <ServiceSelector value={service} onChange={next => { setService(next); resetResult(); }} />
          <HoursInput value={hours} onChange={next => { setHours(next); resetResult(); }} error={error} />
          <EmergencyBooking checked={emergency} onChange={next => { setEmergency(next); resetResult(); }} />
          <button type="submit">Calculate Estimate</button>
        </form>
        <EstimateResult estimate={estimate} />
        <p className="footnote">Price estimate only. Actual availability and bookings are not included.</p>
      </section>
    </main>
  );
}
