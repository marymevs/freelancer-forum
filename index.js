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
  $freelancer.classList.add("freelancerRow");
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
  const $averageSubheading = document.createElement("p");
  $averageSubheading.innerHTML = `
  <span>The average rate is ${averageRate}</span>
  `;

  return $averageSubheading;
}

function TableHeading() {
  const $heading = document.createElement("ul");
  $heading.classList.add("tableHeading");
  $heading.innerHTML = `
  <li>NAME</li>
  <li>OCCUPATION</li>
  <li>RATE</li>
  `;

  return $heading;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
  <h1>Freelancer Forum</h1>
  <Average></Average>
  <Heading></Heading>
  <Freelancers></Freelancers>
`;
  const $average = FreelancerAverage();
  const $heading = TableHeading();
  $app.querySelector("Freelancers").replaceWith(Freelancers(freelancers));
  $app.querySelector("Heading").replaceWith($heading);
  $app.querySelector("Average").replaceWith($average);
}

render();
