// "use strict";

// DOM Elements
const locationInput = document.querySelector("#locationInput");
const locationButton = document.querySelector("#findLocation");

// // Current-Day Elements
const theDay = document.querySelector("#theDay");
const theDayInMonth = document.querySelector("#theDayInMonth");
const locationName = document.querySelector("#locationName");
const tempCelsius = document.querySelector("#tempCelsius");
const tempConditionImage = document.querySelector("#tempConditionImage");
const tempConditionText = document.querySelector("#tempConditionText");
const windKph = document.querySelector("#windKph");
const windDir = document.querySelector("#windDir");
const rainPercentage = document.querySelector("#rainPercentage");

// // Next-Day Elements
const forecastDayOne = document.querySelector("#forecastDayOne");
const forecastOneImage = document.querySelector("#forecastOneConditionImage");
const forecastOneMaxTemp = document.querySelector("#forecastOneMaxTemp");
const forecastOneMinTemp = document.querySelector("#forecastOneMinTemp");
const forecastOneText = document.querySelector("#forecastOneConditionText");

// // Third-Day Elements
const forecastDayTwo = document.querySelector("#forecastDayTwo");
const forecastTwoImage = document.querySelector("#forecastTwoConditionImage");
const forecastTwoMaxTemp = document.querySelector("#forecastTwoMaxTemp");
const forecastTwoMinTemp = document.querySelector("#forecastTwoMinTemp");
const forecastTwoText = document.querySelector("#forecastTwoConditionText");

// Array of days name
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Array of months name
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// An object that maps wind directions to their corresponding names
const windDirections = {
  N: "North",
  NNE: "North Northeast",
  NE: "Northeast",
  E: "East",
  ENE: "East Northeast",
  ESE: "East Southeast",
  SE: "Southeast",
  SSE: "South Southeast",
  S: "South",
  SSW: "South Southwest",
  SW: "Southwest",
  WSW: "West Southwest",
  W: "West",
  WNW: "West Northwest",
  NW: "Northwest",
  NNW: "North Northwest",
};

// GET Data From weatherAPI
async function getData(q = "cairo") {
  let req = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=725e9365e12f46c39d623419233112&q=${q}&days=3`
  );
  let res = await req.json();

  putData(res);
  console.log(res);
}

getData();

// GET Location form user?
locationInput.addEventListener("keyup", function () {
  getData(locationInput.value);
});

// GET the location of user
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      getData(`${latitude},${longitude}`);
    });
  }
}

getLocation();

// PUT Data in Forecast Table
function putData(res) {
  // Day one
  let date = new Date(res.forecast.forecastday[0].date);
  const dateDay = dayNames[date.getDay()];
  theDay.innerHTML = dateDay;
  const dateMonth = monthNames[date.getMonth()];
  theDayInMonth.innerHTML = `${date.getDate()}${dateMonth}`;
  locationName.innerText = res.location.name;
  tempCelsius.innerHTML = `${res.current.temp_c}<sub>o</sub>C`;
  tempConditionImage.innerHTML = `<img src="${res.current.condition.icon}" alt="tempImage">`;
  tempConditionText.innerText = res.current.condition.text;
  rainPercentage.innerHTML = `<img src="imgs/icon-umberella@2x.png" alt="rain"> ${
    res.forecast.forecastday[0].day.daily_chance_of_rain == 0
      ? " No Rain"
      : " Will Rain"
  }`;
  windKph.innerHTML = `<img src="imgs/icon-wind@2x.png" alt="windKph"> ${res.current.wind_kph}km/h`;
  const windDirValue = res.current.wind_dir;
  const windDirName = windDirections[windDirValue] || windDirValue;
  if (windDirName.length > 9) {
    windDir.classList.add("d-block");
    windDir.innerHTML = `<br><img src="imgs/icon-compass@2x.png" alt="windDir"> ${windDirName}`;
  } else {
    windDir.classList.remove("d-block");
    windDir.innerHTML = `<img src="imgs/icon-compass@2x.png" alt="windDir"> ${windDirName}`;
  }

  // Day two
  let date2 = new Date(res.forecast.forecastday[1].date);
  const dateDay2 = dayNames[date2.getDay()];
  forecastDayOne.innerHTML = dateDay2;
  forecastOneImage.innerHTML = `<img src="${res.forecast.forecastday[1].day.condition.icon}" alt="forecastOneImage">`;
  forecastOneMaxTemp.innerHTML = `<p class=" fs-5 text-white fw-bold mb-0 " id="forecastOneMaxTemp">${res.forecast.forecastday[1].day.maxtemp_c}<sub>o</sub>C</p>`;
  forecastOneMinTemp.innerHTML = `<small class="today-color">${res.forecast.forecastday[1].day.mintemp_c}<sub>o</sub>C</small>`;
  forecastOneText.innerHTML = res.forecast.forecastday[1].day.condition.text;

  // Day three
  let date3 = new Date(res.forecast.forecastday[2].date);
  const dateDay3 = dayNames[date3.getDay()];
  forecastDayTwo.innerHTML = dateDay3;
  forecastTwoImage.innerHTML = `<img src="${res.forecast.forecastday[2].day.condition.icon}" alt="forecastTwoImage">`;
  forecastTwoMaxTemp.innerHTML = `<p class=" fs-5 text-white fw-bold mb-0 " id="forecastOneMaxTemp">${res.forecast.forecastday[2].day.maxtemp_c}<sub>o</sub>C</p>`;
  forecastTwoMinTemp.innerHTML = `<small class="today-color ">${res.forecast.forecastday[2].day.mintemp_c}<sub>o</sub>C</small>`;
  forecastTwoText.innerHTML = res.forecast.forecastday[2].day.condition.text;
}
