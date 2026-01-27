/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

// === State ===

const state = Array.from({ length: NUM_FREELANCERS }, makeFreelancer);

/**
 * @returns {Freelancer} a freelancer with a name, occupation, and rate
 * */
function makeFreelancer() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const occupation =
    OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  const rate =
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) +
    PRICE_RANGE.min;

  return { name, occupation, rate };
}

/**
 * @param {array} state
 * @returns {number} the average rate of all freelancers in state.
 * */
function averageRate(state) {
  const rates = [];
  for (freelancer of state) {
    rates.push(freelancer.rate);
  }

  let sum = rates.reduce((acc, rate) => acc + rate);

  return sum / rates.length;
}
