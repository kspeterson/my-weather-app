function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
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

farenheitTemp = null;

function updateWeather(response) {
  document.querySelector("#display-city").innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#display-temp");
  let weatherDescription = document.querySelector("#weather-description");
  let humidityPercent = document.querySelector("#humidity-percent");
  let windSpeed = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#location-time");
  let iconElement = document.querySelector("#weather-icon");
  farenheitTemp = response.data.main.temp;
  tempElement.innerHTML = `${temp}`;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidityPercent.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "45fce9d1406df573dee1e10e20981058";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSubmit(event) {
  let inputCity = document.querySelector("#enter-city").value;
  searchCity(inputCity);
}

function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#enter-city").value;
  let displayCity = document.querySelector("#display-city");
  displayCity.innerHTML = inputCity;
  handleSubmit(inputCity.value);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", showCity);

searchCity(`New York`);

function searchLocation(position) {
  let units = "imperial";
  let apiKey = "45fce9d1406df573dee1e10e20981058";
  let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlLocation).then(updateWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#button-current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsius);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertFarenheit);

function convertCelsius(event) {
  event.preventDefault();
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let tempElement = document.querySelector("#display-temp");
  let celsuisTemp = (farenheitTemp - 32) * 0.5556;
  tempElement.innerHTML = Math.round(celsuisTemp);
}

function convertFarenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let tempElement = document.querySelector("#display-temp");
  tempElement.innerHTML = Math.round(farenheitTemp);
}
