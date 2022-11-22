const main = document.querySelector(".mainBody");
const addUserBtn = document.querySelector(".add_user");
const doubleMoneyBtn = document.querySelector(".double");
const showMillionaireBtn = document.querySelector(".show_millionaires");
const sortingBtn = document.querySelector(".sort");
const totalBtn = document.querySelector(".total_wealth");

// store Data
let data = [];

getRandomUser(data);
getRandomUser(data);
getRandomUser(data);

// fetch rendom user & add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Add new obj to data Array

function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update the DOM Element
function updateDOM(providedData = data) {
  // Clear main Div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<h3><strong>${item.name}</strong> ${formatter.format(
      item.money
    )}</h3></div>`;

    // Insert the DOM element to main section
    main.appendChild(element);
  });
}

/**
 * https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
 */
// Create our number formatter.
const formatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",

  // console.log(formatter.format(2500)); /* $2,500.00 */
});

// Event for add Rendom User
addUserBtn.addEventListener("click", () => {
  getRandomUser(data);
});

// Event for Double Everyone money
doubleMoneyBtn.addEventListener("click", doubleMoney);

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Event for Sorting the list
sortingBtn.addEventListener("click", sortingList);

function sortingList() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Event for Filter ONLY Millionaire
showMillionaireBtn.addEventListener("click", showMillionaire);

function showMillionaire() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

// Event for Calculat Total sum of user Wealth Amount
totalBtn.addEventListener("click", totalWealthSum);

function totalWealthSum() {
  let totalWealth = data.reduce(
    (prevAmount, currAmount) => (prevAmount += currAmount.money),
    0
  );

  const wealthEl = document.createElement("div");
  wealthEl.classList.add("total_wealth_contain");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatter.format(
    totalWealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
}
