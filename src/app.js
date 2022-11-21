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
  let currentTemp = document.querySelector("#current-degrees");
  let weatherDescription = document.querySelector("#weather-description");
  let humidity = response.data.temperature.humidity;
  let humidityValue = document.querySelector("#humidity");
  let wind = response.data.wind.speed;
  let windValue = document.querySelector("#wind");
  let time = document.querySelector("#current-date-time");
  let iconElement = document.querySelector("#weather-icon");
  currentCity.innerHTML = response.data.city;
  celciusTemperature = response.data.temperature.current;
  currentTemp.innerHTML = Math.round(celciusTemperature);
  weatherDescription.innerHTML = response.data.condition.description;
  humidityValue.innerHTML = `${humidity} &degC`;
  windValue.innerHTML = `${wind} km/h`;
  time.innerHTML = formatTime(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col day-one">
                ${day}
                <div class="day-one-icon">☀</div>
                <div class="day-one-max">
                  18&deg <span class="day-one-min">11&deg</span>
                </div>
              </div>
            `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

function farenheightConversion(event) {
  event.preventDefault();
  let farenheightTemp = (celciusTemperature * 9) / 5 + 32;
  celciusLink.classList.remove("active");
  farenheightLink.classList.add("active");
  let currentTemp = document.querySelector("#current-degrees");
  currentTemp.innerHTML = Math.round(farenheightTemp);
}

function celciusConversion(event) {
  event.preventDefault();
  farenheightLink.classList.remove("active");
  celciusLink.classList.add("active");
  let currentTemp = document.querySelector("#current-degrees");
  currentTemp.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", handleSubmit);

let farenheightLink = document.querySelector("#farenheight");
farenheightLink.addEventListener("click", farenheightConversion);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", celciusConversion);

search("Mandurah");
displayForecast();
