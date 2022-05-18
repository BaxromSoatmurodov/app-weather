"use strict";
const api = {
  key: "7b75d18bfbe2a0e4901f9ef0e2b08064",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);
function setQuery(e) {
  if (e.keyCode === 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}
function getResults(query) {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}
function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;
  let now = new Date();
  let data = document.querySelector(".location .data");
  data.innerHTML = buildDate(now);
  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  let weather1 = document.querySelector(".weather");
  weather1.innerHTML = `${weather.weather[0].main}`;
  let minMax = document.querySelector(".min-max");
  minMax.innerHTML = `${Math.round(
    weather.main.temp_min
  )}<span>°c</span>/${Math.round(weather.main.temp_max)}<span>°c</span>`;
}
function buildDate(b) {
  let months = [
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[b.getDay()];
  let date = b.getDate();
  let month = months[b.getMonth()];
  let year = b.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}
