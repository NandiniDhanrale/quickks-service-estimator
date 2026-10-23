import { SERVICE_RATES, formatRupees } from '../utils/pricing.js';
const LABELS = { electrician: 'Electrician', plumber: 'Plumber', carpenter: 'Carpenter' };
export default function ServiceSelector({ value, onChange }) {
  return (
    <div className="field">
      <label htmlFor="service">Service type</label>
      <select id="service" name="service" value={value} onChange={event => onChange(event.target.value)}>
        {Object.entries(SERVICE_RATES).map(([key, rate]) => (
          <option key={key} value={key}>{LABELS[key]} — {formatRupees(rate)}/hr</option>
        ))}
      </select>
    </div>
  );
}
