/** One source of truth for service labels and rates. */
export const SERVICES = Object.freeze({
  electrician: Object.freeze({ label: 'Electrician', rate: 300 }),
  plumber: Object.freeze({ label: 'Plumber', rate: 250 }),
  carpenter: Object.freeze({ label: 'Carpenter', rate: 350 }),
});
export const SERVICE_RATES = Object.freeze(Object.fromEntries(
  Object.entries(SERVICES).map(([key, { rate }]) => [key, rate])
));
export const MIN_HOURS = 1;
export const MAX_HOURS = 24;
export const EMERGENCY_FEE = 100;

export function calculateEstimate(service, hours, emergency = false) {
  if (typeof service !== 'string' || !Object.hasOwn(SERVICES, service)) {
    throw new Error('Please select a valid service.');
  }
  if (typeof hours === 'string' && hours.trim() === '') {
    throw new Error('Please enter working hours (minimum 1).');
  }
  if (typeof hours !== 'number' && typeof hours !== 'string') {
    throw new Error('Please enter valid working hours.');
  }
  const parsedHours = Number(hours);
  if (!Number.isSafeInteger(parsedHours) || parsedHours < MIN_HOURS) {
    throw new Error('Working hours must be a whole number of at least 1.');
  }
  if (parsedHours > MAX_HOURS) {
    throw new Error(`Working hours cannot exceed ${MAX_HOURS}.`);
  }
  if (typeof emergency !== 'boolean') {
    throw new Error('Emergency booking must be true or false.');
  }
  const { label, rate } = SERVICES[service];
  const basePrice = rate * parsedHours;
  const emergencyFee = emergency ? EMERGENCY_FEE : 0;
  const totalPrice = basePrice + emergencyFee;
  return { service, serviceLabel: label, hours: parsedHours, rate, basePrice, emergencyFee, totalPrice };
}
export function formatRupees(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}
