import { formatRupees } from '../utils/pricing.js';
const LABELS = { electrician: 'Electrician', plumber: 'Plumber', carpenter: 'Carpenter' };
export default function EstimateResult({ estimate }) {
  if (!estimate) return null;
  return (
    <section className="result" aria-label="Estimated price" aria-live="polite">
      <h2>Your estimate</h2>
      <div className="line"><span>Service</span><strong>{LABELS[estimate.service]}</strong></div>
      <div className="line"><span>Rate × hours</span><strong>{formatRupees(estimate.rate)} × {estimate.hours} = {formatRupees(estimate.basePrice)}</strong></div>
      <div className="line"><span>Emergency fee</span><strong>{formatRupees(estimate.emergencyFee)}</strong></div>
      <div className="line total"><span>Estimated total</span><strong>{formatRupees(estimate.totalPrice)}</strong></div>
    </section>
  );
}
