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
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let currentCity = document.querySelector("#cityName");
  currentCity.innerHTML = response.data.city;
  let currentTemp = document.querySelector("#current-degrees");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = `${humidity} &degC`;
  let wind = response.data.wind.speed;
  let windValue = document.querySelector("#wind");
  windValue.innerHTML = `${wind} km/h`;
  let time = document.querySelector("#current-date-time");
  time.innerHTML = formatTime(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-icon");
  console.log(response.data.condition.icon);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function search(city) {
  let apiKey = "b4ffb413431b5d4406b3ot5c80af963a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#search-input");
  search(searchElement.value);
}
search("Mandurah");

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", handleSubmit);
