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
  celciusTemperature = response.data.temperature.current;
  currentTemp.innerHTML = Math.round(celciusTemperature);

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.condition.description;

  let time = document.querySelector("#current-date-time");
  time.innerHTML = formatTime(response.data.time * 1000);

  let humidity = response.data.temperature.humidity;
  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = `${humidity} &degC`;

  let wind = response.data.wind.speed;
  let windValue = document.querySelector("#wind");
  windValue.innerHTML = `${wind} km/h`;

  getForecast(response.data.city);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col">
                ${formatDay(forecastDay.time)}
                <div>
                <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                  forecastDay.condition.icon
                }.png" alt="" width=40px
          /></div>
                <div>
                  ${Math.round(
                    forecastDay.temperature.maximum
                  )}&deg <span>${Math.round(
          forecastDay.temperature.minimum
        )}&deg</span>
                </div>
              </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "b4ffb413431b5d4406b3ot5c80af963a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function getForecast(city) {
  console.log(city);
  let apiKey = `b4ffb413431b5d4406b3ot5c80af963a`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#search-input");
  search(searchElement.value);
}

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", handleSubmit);

search("Mandurah");
