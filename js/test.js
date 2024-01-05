"use strict";

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

// const dateDay = [
//   "0-Sunday",
//   "1-Monday",
//   "2-Tuesday",
//   "3-Wednesday",
//   "4-Thursday",
//   "5-Friday",
//   "6-Saturday",
// ];

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// const dateMonth = [
//   "0-January",
//   "1-February",
//   "2-March",
//   "3-April",
//   "4-May",
//   "5-June",
//   "6-July",
//   "7-August",
//   "8-September",
//   "9-October",
//   "10-November",
//   "11-December",
// ];

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
  "1November",
  "1December",
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

getData();

// locationButton.addEventListener("click", function () {
//   getData(locationInput.value);
// });

locationInput.addEventListener("keyup", function () {
  getData(locationInput.value);
});

// GET Data From weatherAPI
async function getData(q = "Cairo") {
  let req = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=725e9365e12f46c39d623419233112&q=${q}&days=3`
  );
  let res = await req.json();
  putData(res);
  console.log(res);
}

// GET the location of user
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Extract latitude and longitude from the position object
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Call getData with the obtained coordinates
      getData(`${latitude},${longitude}`);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// Call getLocation to initiate the process
getLocation();
// PUT Data in Forecast Table
function putData(res) {
  let date = new Date(res.forecast.forecastday[0].date);

  const dateDay = dayNames[date.getDay()];
  theDay.innerHTML = dateDay;

  // //TODO:  Another way to get Day Name
  // for (let i = 0; i < dateDay.length; i++) {
  //   if (dateDay[i].toLowerCase().startsWith(date.getDay())) {
  //     theDay.innerHTML = dateDay[i].slice(2, dateDay[i].length);
  //     break;
  //   }
  // }

  // //TODO: Way three to get Day Name
  // date.getDay() == 0
  //   ? (theDay.innerHTML = "Sunday")
  //   : date.getDay() == 1
  //   ? (theDay.innerHTML = "Monday")
  //   : date.getDay() == 2
  //   ? (theDay.innerHTML = "Tuesday")
  //   : date.getDay() == 3
  //   ? (theDay.innerHTML = "Wednesday")
  //   : date.getDay() == 4
  //   ? (theDay.innerHTML = "Thursday")
  //   : date.getDay() == 5
  //   ? (theDay.innerHTML = "Friday")
  //   : date.getDay() == 6
  //   ? (theDay.innerHTML = "Saturday")
  //   : date.getDay();

  const dateMonth = monthNames[date.getMonth()];
  theDayInMonth.innerHTML = `${date.getDate()}${dateMonth}`;

  // //TODO: Another way to get Month Name
  // for (let i = 0; i < dateMonth.length; i++) {
  //   if (dateMonth[i].toLowerCase().startsWith(date.getMonth())) {
  //     theDayInMonth.innerHTML = `${date.getDate()}${dateMonth[i].slice(
  //       2,
  //       dateMonth[i].length
  //     )}`;
  //     break;
  //   }
  // }

  // //TODO: Way three to get Month Name
  // date.getMonth() == 0
  //   ? (theDayInMonth.innerHTML = `${date.getDate()}January`)
  //   : date.getMonth() == 1
  //   ? (theDayInMonth.innerHTML = `${date.getDate()}February`)
  //   : date.getMonth() == 2
  //   ? (theDayInMonth.innerHTML = `${date.getDate()}March`)
  //   : date.getMonth() == 3
  //   ? (theDayInMonth.innerHTML = `${date.getDate()}April`)
  //   : date.getMonth() == 4
  //   ? (theDayInMonth.innerHTML = `${date.getDate()}May`)
  //   : date.getMonth() == 5
  //   ? (theDayInMonth.innerHTML = `${date.getDate()}June`)
  //   : date.getMonth() == 6
  //   ? (theDayInMonth.innerHTML = `${date.getDate()}July`)
  //   : date.getMonth() == 7
  //   ? (theDayInMonth.innerHTML = `${date.getDate()}August`)
  //   : date.getMonth() == 8
  //   ? (theDayInMonth.innerHTML = `${date.getDate()}September`)
  //   : date.getMonth() == 9
  //   ? (theDayInMonth.innerHTML = `${date.getDate()}October`)
  //   : date.getMonth() == 10
  //   ? (theDayInMonth.innerHTML = `${date.getDate()}November`)
  //   : date.getMonth() == 11
  //   ? (theDayInMonth.innerHTML = `${date.getDate()}December`)
  //   : date.getMonth();

  locationName.innerText = res.location.name;
  tempCelsius.innerHTML = `${res.current.temp_c}<sub>o</sub>C`;
  tempConditionImage.innerHTML = `<img src="${res.current.condition.icon}" alt="tempImage">`;
  tempConditionText.innerText = res.current.condition.text;
  rainPercentage.innerHTML = `<img src="imgs/icon-umberella@2x.png" alt="rain"> ${
    res.forecast.forecastday[0].day.daily_chance_of_rain == 0
      ? " No Rain"
      : " Will Rain"
  }`;
  console.log(res.current.wind_dir);
  windKph.innerHTML = `<img src="imgs/icon-wind@2x.png" alt="windKph"> ${res.current.wind_kph}km/h`;

  // Retrieve the wind direction value from the API response
  const windDirValue = res.current.wind_dir;
  // Use the windDirections object to get the corresponding wind direction name,
  // or use the original value if not found in the mapping
  const windDirName = windDirections[windDirValue] || windDirValue;
  // Set the HTML content of the windDir element with the formatted wind direction
  windDir.innerHTML = `<img src="imgs/icon-compass@2x.png" alt="windDir"> ${windDirName}`;

  // //TODO: Another way to get direction name
  // windDir.innerHTML = `<img src="imgs/icon-compass@2x.png" alt="windDir"> ${
  //   res.current.wind_dir === "N"
  //     ? (res.current.wind_dir = "North")
  //     : res.current.wind_dir === "NNE"
  //     ? (res.current.wind_dir = "North-Northeast")
  //     : res.current.wind_dir === "NE"
  //     ? (res.current.wind_dir = "Northeast")
  //     : res.current.wind_dir === "E"
  //     ? (res.current.wind_dir = "East")
  //     : res.current.wind_dir === "ENE"
  //     ? (res.current.wind_dir = "East-Northeast")
  //     : res.current.wind_dir === "ESE"
  //     ? (res.current.wind_dir = "East-Southeast")
  //     : res.current.wind_dir === "SE"
  //     ? (res.current.wind_dir = "Southeast")
  //     : res.current.wind_dir === "SSE"
  //     ? (res.current.wind_dir = "South-Southeast")
  //     : res.current.wind_dir === "S"
  //     ? (res.current.wind_dir = "South")
  //     : res.current.wind_dir === "SSW"
  //     ? (res.current.wind_dir = "South-Southwest ")
  //     : res.current.wind_dir === "SW"
  //     ? (res.current.wind_dir = "Southwest")
  //     : res.current.wind_dir === "WSW"
  //     ? (res.current.wind_dir = "West-Southwest")
  //     : res.current.wind_dir === "W"
  //     ? (res.current.wind_dir = "West")
  //     : res.current.wind_dir === "WNW"
  //     ? (res.current.wind_dir = "West-Northwest")
  //     : res.current.wind_dir === "NW"
  //     ? (res.current.wind_dir = "Northwest")
  //     : res.current.wind_dir === "NNW"
  //     ? (res.current.wind_dir = "North-Northwest")
  //     : res.current.wind_dir
  // }`;

  // Day two
  let date2 = new Date(res.forecast.forecastday[1].date);
  const dateDay2 = dayNames[date2.getDay()];
  forecastDayOne.innerHTML = dateDay2;
  // //TODO: Another way to get Day2 name
  // date2.getDay() == 0
  //   ? (forecastDayOne.innerHTML = "Sunday")
  //   : date2.getDay() == 1
  //   ? (forecastDayOne.innerHTML = "Monday")
  //   : date2.getDay() == 2
  //   ? (forecastDayOne.innerHTML = "Tuesday")
  //   : date2.getDay() == 3
  //   ? (forecastDayOne.innerHTML = "Wednesday")
  //   : date2.getDay() == 4
  //   ? (forecastDayOne.innerHTML = "Thursday")
  //   : date2.getDay() == 5
  //   ? (forecastDayOne.innerHTML = "Friday")
  //   : date2.getDay() == 6
  //   ? (forecastDayOne.innerHTML = "Saturday")
  //   : date2.getDay();

  forecastOneImage.innerHTML = `<img src="${res.forecast.forecastday[1].day.condition.icon}" alt="forecastOneImage">`;
  forecastOneMaxTemp.innerHTML = `<p class=" fs-5 text-white fw-bold mb-0 " id="forecastOneMaxTemp">${res.forecast.forecastday[1].day.maxtemp_c}<sub>o</sub>C</p>`;
  forecastOneMinTemp.innerHTML = `<small class="today-color">${res.forecast.forecastday[1].day.mintemp_c}<sub>o</sub>C</small>`;
  forecastOneText.innerHTML = res.forecast.forecastday[1].day.condition.text;

  // Day three
  let date3 = new Date(res.forecast.forecastday[2].date);
  const dateDay3 = dayNames[date3.getDay()];
  forecastDayTwo.innerHTML = dateDay3;
  // //TODO: Another way to get Day3 name
  // date3.getDay() == 0
  //   ? (forecastDayTwo.innerHTML = "Sunday")
  //   : date3.getDay() == 1
  //   ? (forecastDayTwo.innerHTML = "Monday")
  //   : date3.getDay() == 2
  //   ? (forecastDayTwo.innerHTML = "Tuesday")
  //   : date3.getDay() == 3
  //   ? (forecastDayTwo.innerHTML = "Wednesday")
  //   : date3.getDay() == 4
  //   ? (forecastDayTwo.innerHTML = "Thursday")
  //   : date3.getDay() == 5
  //   ? (forecastDayTwo.innerHTML = "Friday")
  //   : date3.getDay() == 6
  //   ? (forecastDayTwo.innerHTML = "Saturday")
  //   : date3.getDay();

  forecastTwoImage.innerHTML = `<img src="${res.forecast.forecastday[2].day.condition.icon}" alt="forecastTwoImage">`;
  forecastTwoMaxTemp.innerHTML = `<p class=" fs-5 text-white fw-bold mb-0 " id="forecastOneMaxTemp">${res.forecast.forecastday[2].day.maxtemp_c}<sub>o</sub>C</p>`;
  forecastTwoMinTemp.innerHTML = `<small class="today-color ">${res.forecast.forecastday[2].day.mintemp_c}<sub>o</sub>C</small>`;
  forecastTwoText.innerHTML = res.forecast.forecastday[2].day.condition.text;
}
