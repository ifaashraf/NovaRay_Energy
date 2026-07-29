/*
 * NovaRay Energy — Estimated Annual Savings by System Size
 *
 * Edit the numbers below to update the savings calculator on the site.
 * No other file needs to change. Values are in whole rupees (no commas).
 *
 * kw   = solar system size in kW
 * min  = low end of estimated annual savings range (₹)
 * max  = high end of estimated annual savings range (₹)
 * tier = 'residential' (3-20 kW) or 'commercial' (30 kW+ — rougher estimates,
 *        savings depend heavily on tariff and usage pattern for commercial/
 *        industrial connections)
 */
const SAVINGS_TABLE = [
  { kw: 3, min: 35000, max: 45000, tier: 'residential' },
  { kw: 4, min: 45000, max: 60000, tier: 'residential' },
  { kw: 5, min: 60000, max: 75000, tier: 'residential' },
  { kw: 6, min: 70000, max: 90000, tier: 'residential' },
  { kw: 7, min: 80000, max: 105000, tier: 'residential' },
  { kw: 8, min: 95000, max: 120000, tier: 'residential' },
  { kw: 9, min: 105000, max: 135000, tier: 'residential' },
  { kw: 10, min: 120000, max: 150000, tier: 'residential' },
  { kw: 11, min: 135000, max: 165000, tier: 'residential' },
  { kw: 12, min: 145000, max: 180000, tier: 'residential' },
  { kw: 13, min: 160000, max: 195000, tier: 'residential' },
  { kw: 14, min: 175000, max: 210000, tier: 'residential' },
  { kw: 15, min: 190000, max: 225000, tier: 'residential' },
  { kw: 16, min: 200000, max: 240000, tier: 'residential' },
  { kw: 17, min: 215000, max: 255000, tier: 'residential' },
  { kw: 18, min: 230000, max: 270000, tier: 'residential' },
  { kw: 19, min: 245000, max: 285000, tier: 'residential' },
  { kw: 20, min: 260000, max: 300000, tier: 'residential' },
  { kw: 30, min: 390000, max: 450000, tier: 'commercial' },
  { kw: 40, min: 520000, max: 600000, tier: 'commercial' },
  { kw: 50, min: 650000, max: 750000, tier: 'commercial' },
  { kw: 60, min: 780000, max: 900000, tier: 'commercial' },
  { kw: 70, min: 910000, max: 1050000, tier: 'commercial' },
  { kw: 100, min: 1300000, max: 1500000, tier: 'commercial' },
  { kw: 200, min: 2600000, max: 3000000, tier: 'commercial' },
  { kw: 300, min: 3900000, max: 4500000, tier: 'commercial' },
  { kw: 500, min: 6500000, max: 7500000, tier: 'commercial' },
  { kw: 1000, min: 13000000, max: 15000000, tier: 'commercial' },
];
