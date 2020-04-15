//global variables for city input field, search button, and cities array for localStorage
var searchBtn = $("#search");
var cities = [];

//user searches for a city, upon click of spyglass use AJAX to query that city from weather API, city saves in localStorage
$(searchBtn).on("click", function (event) {
  event.preventDefault();
  console.log(event);
  var cityInput = $("#search-city").val();
  console.log(cityInput);
  localStorage.setItem("cities", cityInput);
  findWeather(cityInput);
});
//today's forecast populates to the forecast-today div (card), 5-day forecast populates to the forecast-future(cards)
var apiKey = "f89051132db4ab1cb9f39239dc668ba0";

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
    console.log(queryUrl2);
  });
}

//upon refresh, any cities in localStorage persist/append to unordered list (id: past-cities), need to create <li class="list-group-item"> for each
//upon refresh, last searched city's forecast-today and forecast-future persists
