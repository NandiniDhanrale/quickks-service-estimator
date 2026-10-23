export default function EmergencyBooking({ checked, onChange }) {
  return (
    <label className="check-row" htmlFor="emergency">
      <input id="emergency" name="emergency" type="checkbox" checked={checked}
        onChange={event => onChange(event.target.checked)} />
      <span><strong>Emergency booking</strong><small>One-time additional fee of ₹100</small></span>
    </label>
  );
}
