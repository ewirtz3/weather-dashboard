//global variables for city input field, search button, and cities array for localStorage
var cityInput = $("#search-city").val();
var searchBtn = $("#search");
var cities = [];

//user searches for a city, upon click of spyglass use AJAX to query that city from weather API, city saves in localStorage
$(searchBtn).on("click", function (event) {
  event.preventDefault();
  console.log(event);
  var currentCity = event.target.previousElementSibling.value;
  console.log(currentCity);
  localStorage.setItem("cities", currentCity);
});
//today's forecast populates to the forecast-today div (card), 5-day forecast populates to the forecast-future(cards)

//upon refresh, any cities in localStorage persist/append to unordered list (id: past-cities), need to create <li class="list-group-item"> for each
//upon refresh, last searched city's forecast-today and forecast-future persists
