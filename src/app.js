let temperature = 12;
let unitSelected = "c";
let apiKey = "2b6fdad0cbd018949c50c70f72250726";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

function setCurrentDay() {
  let date = new Date();
  let currentDate = date.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${day}, ${currentDate} ${month} ${year}, ${hours}:${minutes}`;
}

function setUnit(unit) {
  const temperatureElement = document.querySelector("#temperature-unit");

  unitSelected = unit;

  if (unit === "c") {
    temperatureElement.innerHTML = temperature;
  } else {
    temperatureElement.innerHTML = temperature * 1.8 + 32;
  }
}

function currentTemperature(response) {
  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let tempUnit = document.querySelector("#temperature-unit");
  tempUnit.innerHTML = `${temp}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = city;
}

function getPositionByCoordinates(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  axios
    .get(`${apiUrl}&appid=${apiKey}&lat=${lat}&lon=${lon}`)
    .then(currentTemperature);
}

function getPositionByCityName(cityName) {
  axios.get(`${apiUrl}&appid=${apiKey}&q=${cityName}`).then(currentTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getPositionByCoordinates);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  if (!searchInput || searchInput.value === "") {
    alert("You must type the city name!");
  } else {
    let h2 = document.querySelector("h2");
    h2.innerHTML = searchInput.value;

    getPositionByCityName(searchInput.value);
  }
}

function onLoad() {
  setCurrentDay();
  setUnit("c");

  let celsiusToggle = document.querySelector("#celsius-toggle");
  let farToggle = document.querySelector("#far-toggle");
  let form = document.querySelector("#search-form");
  let buttonCurrentPosition = document.querySelector("#button-current");

  celsiusToggle.addEventListener("click", () => setUnit("c"));
  farToggle.addEventListener("click", () => setUnit("f"));
  buttonCurrentPosition.addEventListener("click", () => getCurrentPosition());
  form.addEventListener("submit", search);
}

window.addEventListener("load", onLoad);
