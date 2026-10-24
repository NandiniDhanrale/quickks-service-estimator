import { formatRupees } from '../utils/pricing.js';

export default function EstimateResult({ estimate }) {
  if (!estimate) return null;
  return (
    <section className="result" aria-label="Estimated price breakdown" aria-live="polite">
      <h2>Your price breakdown</h2>
      <div className="line"><span>Service</span><strong>{estimate.serviceLabel}</strong></div>
      <div className="line"><span>Hourly rate</span><strong>{formatRupees(estimate.rate)}/hr</strong></div>
      <div className="line"><span>Working hours</span><strong>{estimate.hours}</strong></div>
      <div className="line"><span>Service subtotal ({estimate.hours} × {formatRupees(estimate.rate)})</span><strong>{formatRupees(estimate.basePrice)}</strong></div>
      <div className="line"><span>Emergency fee</span><strong>{formatRupees(estimate.emergencyFee)}</strong></div>
      <div className="line total"><span>Estimated total</span><strong>{formatRupees(estimate.totalPrice)}</strong></div>
    </section>
  );
}
