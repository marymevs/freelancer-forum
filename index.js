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

const freelancers = Array.from({ length: NUM_FREELANCERS }, makeFreelancer);
const averageRate = getAverageRate(freelancers);

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
function getAverageRate(freelancers) {
  const rates = [];
  for (const freelancer of freelancers) {
    rates.push(freelancer.rate);
  }

  let sum = rates.reduce((acc, rate) => acc + rate);

  return sum / rates.length;
}

// === Components ===

/**
 * @return a component representing a single freelancer
 */
function FreelancerElement(freelancer) {
  const $freelancer = document.createElement("li");
  $freelancer.innerHTML = `
  <span>${freelancer.name}</span>
  <span>${freelancer.occupation}</span>
  <span>${freelancer.rate}</span>
  `;

  return $freelancer;
}

/**
 * @return a component function to represent an array of freelancers
 * */
function Freelancers(freelancers) {
  const $freelancerList = document.createElement("ul");
  const $freelancers = freelancers.map(FreelancerElement);
  $freelancerList.replaceChildren(...$freelancers);

  return $freelancerList;
}

/**
 * @returns a component to show average rate of all freelancers.
 * */
function FreelancerAverage() {
  const $averageSubheading = document.createAttribute("p");
  $averageSubheading.innerHTML = `The average rate is ${averageRate}`;

  return $averageSubheading;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
  <h1>Freelancer Forum</h1>
  <p>The average rate is ${averageRate}</p>
  <Freelancers></Freelancers>
`;
  $app.querySelector("Freelancers").replaceWith(Freelancers(freelancers));
}

render();
