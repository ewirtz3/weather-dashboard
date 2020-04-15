//global variables for search button and cities array for localStorage
var searchBtn = $("#search");
var cities = [];

//on document load, render past cities searched
$(document).ready(renderCity(localStorage.getItem("cities")));

//user searches for a city, upon click of spyglass use AJAX to query that city from weather API, city saves in localStorage, findWeather function runs
$(searchBtn).on("click", function (event) {
  event.preventDefault();
  var cityInput = $("#search-city").val();
  console.log(cityInput);
  if (cityInput === "") {
    return;
  }
  cities.push(cityInput);
  storeCity(cityInput);
  findWeather(cityInput);
});

//function to set cityInput to localStorage, adding it to the cities array
function storeCity(cityInput) {
  localStorage.setItem("cities", JSON.stringify(cities));
}

//function to render past cities searched
function renderCity() {
  var cityDiv = $("#past-cities");
  $.each(JSON.parse(localStorage.getItem("cities")), function (i, city) {
    var newCity = $("<li>" + city + "</li>");
    newCity.addClass("list-group-item").appendTo(cityDiv);
  });
}

//today's forecast populates to the forecast-today div (card), 5-day forecast populates to the forecast-future(cards)
//defining global variable apiKey
var apiKey = "f89051132db4ab1cb9f39239dc668ba0";

//function to get weather info
function findWeather(cityInput) {
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput +
    "&appid=" +
    apiKey;
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    var queryUrl2 =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      response.coord.lat +
      "&lon=" +
      response.coord.lon +
      "&appid=" +
      apiKey;
    $.ajax({
      url: queryUrl2,
      method: "GET",
    }).then(function (response) {
      console.log(moment().format("M/D/YYYY"));
      console.log(response.current.temp);
      console.log(response.current.humidity);
      console.log(response.current.wind_speed);
      console.log(response.current.uvi);
    });
  });
}

//upon refresh, any cities in localStorage persist/append to unordered list (id: past-cities), need to create <li class="list-group-item"> for each
//upon refresh, last searched city's forecast-today and forecast-future persists
