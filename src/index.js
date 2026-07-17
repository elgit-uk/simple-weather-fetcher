function updateWeatherIfo(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);

  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = response.data.temperature.humidity;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.condition.description;

  let currentWindSpeed = document.querySelector("#current-wind-speed");
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);
}
function findTheCity(city) {
  let apiKey = "2d3ffca2b4824o0a82a3f230545c636t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric `;
  axios.get(apiUrl).then(updateWeatherIfo);
}
function fetchCity(event) {
  event.preventDefault();

  let searchedCity = document.querySelector("#search-input");
  let currentLocation = document.querySelector("#current-location");

  currentLocation.innerHTML = searchedCity.value;

  findTheCity(searchedCity.value);
}

let searchCityElement = document.querySelector("#search-city");
searchCityElement.addEventListener("submit", fetchCity);
