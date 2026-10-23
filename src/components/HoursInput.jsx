export default function HoursInput({ value, onChange, error }) {
  return (
    <div className="field">
      <label htmlFor="hours">Working hours</label>
      <input id="hours" name="hours" type="number" min="1" step="1" inputMode="numeric"
        value={value} onChange={event => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'hours-help hours-error' : 'hours-help'} />
      <small id="hours-help">Minimum 1 hour; whole hours only.</small>
      {error && <p id="hours-error" role="alert" className="error">{error}</p>}
    </div>
  );
}
