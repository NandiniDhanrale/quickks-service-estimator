import { MIN_HOURS, MAX_HOURS } from '../utils/pricing.js';

export default function HoursInput({ value, onChange, error }) {
  return (
    <div className="field">
      <label htmlFor="hours">Working hours</label>
      <input id="hours" name="hours" type="number" min={MIN_HOURS} max={MAX_HOURS}
        step="1" inputMode="numeric" value={value}
        onChange={event => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'hours-help hours-error' : 'hours-help'} />
      <small id="hours-help">Minimum {MIN_HOURS} hour; maximum {MAX_HOURS} hours. Whole hours only.</small>
      {error && <p id="hours-error" role="alert" className="error">{error}</p>}
    </div>
  );
}
