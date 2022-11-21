function displayTemperature(response) {
  console.log(response.data);
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
}

let apiKey = "b4ffb413431b5d4406b3ot5c80af963a";
let query = "Mandurah";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);

new Date();
console.log(new Date(1668992925 * 1000));
