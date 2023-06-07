let temperature;
let unitSelected = "c";
let apiKey = "2b6fdad0cbd018949c50c70f72250726";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
let searched = false;

function getIconSrc(name) {
  return `http://openweathermap.org/img/wn/${name}@2x.png`;
}

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

function displayForecast() {
  const forecastElement = document.querySelector("#forecast");
  console.log({forecastElement})
  const days = [ "Wed"];

  const forecastHTML = `
    <div class="row">
      ${days.map((day) => `
        <div class="col text-center weather-day">
          <div><strong>${day}</strong></div>
            <svg class="mt-2" width="100" height="100" viewBox="0 0 32 32" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
              d="M15 5V2H17V5H15ZM20.634 5.97381L22.134 3.37573L23.8661 4.37573L22.3661 6.97381L20.634 5.97381ZM16 23C19.866 23 23 19.866 23 16C23 12.134 19.866 9 16 9C12.134 9 9 12.134 9 16C9 19.866 12.134 23 16 23ZM16 25C20.9706 25 25 20.9706 25 16C25 11.0294 20.9706 7 16 7C11.0294 7 7 11.0294 7 16C7 20.9706 11.0294 25 16 25ZM27 15H30V17H27V15ZM27.6243 8.13397L25.0263 9.63397L26.0263 11.366L28.6243 9.86603L27.6243 8.13397ZM8.13397 4.37573L9.63397 6.97381L11.366 5.97381L9.86603 3.37573L8.13397 4.37573ZM5.97375 11.366L3.37567 9.86603L4.37567 8.13397L6.97375 9.63397L5.97375 11.366ZM15 27V30H17V27H15ZM5 15H2V17H5V15ZM3.37562 22.134L5.97369 20.634L6.97369 22.366L4.37562 23.866L3.37562 22.134ZM9.63404 25.0264L8.13404 27.6244L9.86609 28.6244L11.3661 26.0264L9.63404 25.0264ZM22.134 28.6244L20.634 26.0264L22.366 25.0264L23.866 27.6244L22.134 28.6244ZM25.0263 22.366L27.6244 23.866L28.6244 22.134L26.0263 20.634L25.0263 22.366Z"
              fill="#a6a6a6" />
            </svg>
        </div>`
      ).join('')}
    </div>
  `;

  forecastElement.innerHTML = forecastHTML;
  
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
  let icon = response.data.weather[0].icon;
  let wind = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  let weatherDescription = response.data.weather[0].description;
  temperature = Math.round(response.data.main.temp);

  document.querySelector("#main-content").style.display = "block";
  document.querySelector("#temperature-unit").innerHTML = `${temperature}`;
  document.querySelector("h2").innerHTML = city;
  document.querySelector("#weather-description").innerHTML = weatherDescription;
  document.querySelector("#weather-icon").src = getIconSrc(icon);
  document.querySelector("#wind-info").innerHTML = wind;
  document.querySelector("#humidity-info").innerHTML = humidity;
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
    displayForecast()

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
