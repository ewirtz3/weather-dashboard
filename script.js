//global variables for search button and cities array for localStorage
var searchBtn = $("#search");
var cities = [];

//on document load, render past cities searched
$(document).ready(renderCity());

//user searches for a city, upon click of spyglass use AJAX to query that city from weather API, city saves in localStorage, findWeather function runs
//upon refresh, any cities in localStorage persist/append to unordered list (id: past-cities), need to create <li class="list-group-item"> for each
$(searchBtn).on("click", function (event) {
  event.preventDefault();
  $("#current-weather-card").empty();
  $("#forecast-future").empty();
  var cityInput = $("#search-city").val();
  if (cityInput === "") {
    return;
  }
  cities.push(cityInput);
  storeCity(cityInput);
  findWeather(cityInput);
  futureWeather(cityInput);
  renderCity();
});

//function to set cityInput to localStorage, adding it to the cities array
function storeCity(cityInput) {
  localStorage.setItem("cities", JSON.stringify(cities));
}

//function to render past cities searched
function renderCity() {
  var cityDiv = $("#past-cities");
  $(cityDiv).empty();
  $.each(JSON.parse(localStorage.getItem("cities")), function (i, city) {
    var newCity = $("<li>" + city + "</li>");
    newCity.addClass("list-group-item").appendTo(cityDiv);
  });
}

//today's forecast populates to the forecast-today div (card), 5-day forecast populates to the forecast-future(cards)
//defining global variable apiKey
var apiKey = "f89051132db4ab1cb9f39239dc668ba0";

//function to get current weather info
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
      apiKey +
      "&units=imperial";
    $.ajax({
      url: queryUrl2,
      method: "GET",
    }).then(function (response2) {
      var currentDate = $(
        "<h2>" + cityInput + " (" + moment().format("M/D/YYYY") + ")" + "<h2>"
      );
      var currentTemp = $(
        "<div>" +
          "Temperature: " +
          response2.current.temp +
          " &deg;F" +
          "</div>"
      );
      var currentHumidity = $(
        "<div>" + "Humidity: " + response2.current.humidity + "%" + "</div>"
      );
      var currentWind = $(
        "<div>" +
          "Wind Speed: " +
          response2.current.wind_speed +
          " mph" +
          "</div>"
      );
      var currentUvi = $(
        "<div>" +
          "UV Index: " +
          "<span>" +
          response2.current.uvi +
          "</span>" +
          "</div>"
      );
      if (response2.current.uvi < 4) {
        $("span").addClass("badge badge-success");
      }
      if (response2.current.uvi >= 4 && response2.current.uvi < 7) {
        $("span").addClass("badge badge-warning");
      }
      if (response2.current.uvi > 7) {
        $("span").addClass("badge badge-danger");
      }
      var currentIcon = response2.current.weather[0].icon;
      var weatherIcon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
      );
      $("#forecast-today").removeClass("d-none");
      $(currentDate).addClass("card-title").appendTo("#current-weather-card");
      $(weatherIcon).appendTo("#current-weather-card");
      $(currentTemp).addClass("card-text").appendTo("#current-weather-card");
      $(currentHumidity)
        .addClass("card-text")
        .appendTo("#current-weather-card");
      $(currentWind).addClass("card-text").appendTo("#current-weather-card");
      $(currentUvi).addClass("card-text").appendTo("#current-weather-card");
    });
  });
}

//function to get future weather info

function futureWeather(cityInput) {
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityInput +
    "&appid=" +
    apiKey +
    "&units=imperial";
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    var futureDate = $(
      "<h5>" + moment().add(1, "d").format("M/D/YYYY") + "</h5>"
    );
    var futureTemp = $(
      "<div>" + "Temp: " + response.list[0].main.temp + " &deg;F" + "</div>"
    );
    var futureHumidity = $(
      "<div>" + "Humidity: " + response.list[0].main.humidity + "%" + "</div>"
    );
    var futureIcon = response.list[0].weather[0].icon;
    var futureWeatherIcon = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/wn/" + futureIcon + "@2x.png"
    );
    var newCard = $("<div>").addClass("card").appendTo("#forecast-future");
    var newCardBody = $("<div>").addClass("card-body").appendTo(newCard);
    $(futureDate).addClass("card-title").appendTo(newCardBody);
    $(futureWeatherIcon).appendTo(newCardBody);
    $(futureTemp).addClass("card-text").appendTo(newCardBody);
    $(futureHumidity).addClass("card-text").appendTo(newCardBody);
  });
}

//upon refresh, last searched city's forecast-today and forecast-future persists
