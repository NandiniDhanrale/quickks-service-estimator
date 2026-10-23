/** Independent business rules; React components do not own the pricing logic. */
export const SERVICE_RATES = Object.freeze({
  electrician: 300,
  plumber: 250,
  carpenter: 350,
});
export const EMERGENCY_FEE = 100;

export function calculateEstimate(service, hours, emergency = false) {
  if (typeof service !== 'string' || !Object.hasOwn(SERVICE_RATES, service)) {
    throw new Error('Please select a valid service.');
  }
  // Reject empty before Number('') converts it to zero.
  if (typeof hours === 'string' && hours.trim() === '') {
    throw new Error('Please enter working hours (minimum 1).');
  }
  if (typeof hours !== 'number' && typeof hours !== 'string') {
    throw new Error('Please enter valid working hours.');
  }
  const parsedHours = Number(hours);
  if (!Number.isSafeInteger(parsedHours) || parsedHours < 1) {
    throw new Error('Working hours must be a whole number of at least 1.');
  }
  if (typeof emergency !== 'boolean') {
    throw new Error('Emergency booking must be true or false.');
  }
  const rate = SERVICE_RATES[service];
  const basePrice = rate * parsedHours;
  const emergencyFee = emergency ? EMERGENCY_FEE : 0;
  const totalPrice = basePrice + emergencyFee;
  if (!Number.isSafeInteger(totalPrice)) {
    throw new Error('Working hours are too large.');
  }
  return { service, hours: parsedHours, rate, basePrice, emergencyFee, totalPrice };
}
export function formatRupees(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}
