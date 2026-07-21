function updateWeatherInfo(response) {
  let icon = document.querySelector("#weather-description-icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" id="weather-description-icon" />`;

  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = response.data.city;

  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.condition.description;

  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = response.data.temperature.humidity;

  let currentWindSpeed = document.querySelector("#current-wind-speed");
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);

  let date = new Date(response.data.time * 1000);
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = dateTime(date);

  forecast(response.data.city);
}

function dateTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function findTheCity(city) {
  let apiKey = "2d3ffca2b4824o0a82a3f230545c636t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherInfo);
}
function fetchCity(event) {
  event.preventDefault();

  let searchedCity = document.querySelector("#search-input");
  findTheCity(searchedCity.value);
}

function forecast(city) {
  let apiKey = "2d3ffca2b4824o0a82a3f230545c636t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function startDay(timeUnit) {
  let date = new Date(timeUnit * 1000);
  let dayRow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return dayRow[date.getDay()];
}
function displayForecast(response) {
  let forecastForEachDay = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastForEachDay =
        forecastForEachDay +
        `
  <div class="day">
    <div class="day-name">${startDay(day.time)}</div>
    <div class="day-weather-description-icon"> <img src="${day.condition.icon_url}" class="image-forecast-icon"/></div>
    <div class="day-temperatures">
      <span class="day-highest-temp">
        <strong>${Math.round(day.temperature.maximum)}<sup class="day-temperature-unit">°C</sup></strong>
      </span>
      <span class="day-lowest-temp">
        ${Math.round(day.temperature.minimum)}<sup class="day-temperature-unit">°C</sup>
      </span>
    </div>
  </div>
`;
    }
  });
  let forecastArray = document.querySelector("#forecast");
  forecastArray.innerHTML = forecastForEachDay;
}
let searchElement = document.querySelector("#search-city");
searchElement.addEventListener("submit", fetchCity);
findTheCity("London");
