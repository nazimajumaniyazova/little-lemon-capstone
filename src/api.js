/*
 * Mock API provided by Meta for the Little Lemon capstone project.
 * In a real project these would come from window.fetchAPI / window.submitAPI
 * loaded from an external script. We re-implement them here so the app works
 * standalone and unit tests can import them.
 */

// Seeded pseudo-random so the same date always returns the same set of times.
const seededRandom = (seed) => {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed % m;
  return () => (s = (s * a) % m) / m;
};

export const fetchAPI = (date) => {
  const result = [];
  // Accept Date objects or YYYY-MM-DD strings
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return [];
  const random = seededRandom(d.getDate());
  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) result.push(`${i}:00`);
    if (random() < 0.5) result.push(`${i}:30`);
  }
  return result;
};

export const submitAPI = (formData) => {
  // The mock always succeeds. Real impl would POST to a backend.
  return Boolean(formData);
};
