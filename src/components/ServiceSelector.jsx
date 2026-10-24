import { SERVICES, formatRupees } from '../utils/pricing.js';

export default function ServiceSelector({ value, onChange }) {
  return (
    <div className="field">
      <label htmlFor="service">Service type</label>
      <select id="service" name="service" value={value} onChange={event => onChange(event.target.value)}>
        {Object.entries(SERVICES).map(([key, { label, rate }]) => (
          <option key={key} value={key}>{label} — {formatRupees(rate)}/hr</option>
        ))}
      </select>
    </div>
  );
}
