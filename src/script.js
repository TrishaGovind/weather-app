function formatDate(date) {
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${date.getMinutes()}`;
  }

  return `${day}, ${hour}:${minutes}`;
}

let currentDay = new Date();
document.querySelector("#date").innerHTML = formatDate(currentDay);

function formatTime(timestamp) {
  let time = new Date(timestamp);

  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function cityUpdate(event) {
  event.preventDefault();
  let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";
  let city = document.querySelector("#search-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#today-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("#day-high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#day-low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#update-sunrise").innerHTML = formatTime(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#update-sunset").innerHTML = formatTime(
    response.data.sys.sunset * 1000
  );
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = `metric`;
  let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}

navigator.geolocation.getCurrentPosition(showPosition);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayForecast() {
  let forecastElement = document.querySelector("#five-day-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-4">
  <div class="days">
    <ul>
      <li>${day}</li>
    </ul>
  </div>
  </div>
  <div class="col-4">
  <div class="high-low-2">
    <ul>
      <li><strong>19º</strong> | 10º</li>
    </ul>
  </div>
  </div>
  <div class="col-4" id="icons">
  <div class="icon">
    <ul>
      <li><i class="fas fa-sun"></i></li>
    </ul>
  </div>
  </div>
    
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

let form = document.querySelector("form");
form.addEventListener("submit", cityUpdate);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
