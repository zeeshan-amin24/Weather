const apiKey = "3a693d65583a6f9b4ff12f1d81351bce";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const search = document.getElementById("search");
const searchBtn = document.querySelector(".btn");
const weatherIcon = document.querySelector(".weather-icon");
const displayPage = document.querySelector(".weather");
let errorPage = document.querySelector(".error");
function checkWeather(city) {
  let response = fetch(apiUrl + city + `&appid=${apiKey}`)
    .then((response) => {
      if (response.status == 404) {
        errorPage.classList.remove("hide");
        displayPage.classList.add("hide");
      } else {
        errorPage.classList.add("hide");
        return response.json();
      }
    })
    .then((data) => {
      const weather = data;

      document.querySelector(".city").innerHTML = weather.name;
      document.querySelector(".temp").innerHTML =
        parseFloat(weather.main.temp).toFixed(1) + "°C";
      document.querySelector(
        ".humidity-percent"
      ).innerHTML = `${weather.main.humidity}%`;
      document.querySelector(
        ".wind-speed"
      ).innerHTML = `${weather.wind.speed} Km/hr`;

      if (weather.weather[0].main == "Clouds") {
        weatherIcon.src =
          "https://cdn-icons-png.flaticon.com/128/1146/1146869.png";
      } else if (weather.weather[0].main == "Clear") {
        weatherIcon.src =
          "https://cdn-icons-png.flaticon.com/128/6974/6974833.png";
      } else if (weather.weather[0].main == "Rain") {
        weatherIcon.src =
          "https://cdn-icons-png.flaticon.com/128/2060/2060872.png";
      } else if (weather.weather[0].main == "Drizzle") {
        weatherIcon.src =
          "https://cdn-icons-png.flaticon.com/128/3075/3075858.png";
      } else if (weather.weather[0].main == "Mist") {
        weatherIcon.src =
          "https://cdn-icons-png.flaticon.com/128/9424/9424541.png";
      } else if (weather.weather[0].main == "Haze") {
        weatherIcon.src =
          "https://cdn-icons-png.flaticon.com/128/4151/4151022.png";
      }
      else if (weather.weather[0].main == "Snow") {
        weatherIcon.src =
          "https://cdn-icons-png.flaticon.com/128/2315/2315309.png";
      }


      displayPage.classList.remove("hide");

      localStorage.setItem("lastcity", city);
    });
}
searchBtn.addEventListener("click", function () {
  checkWeather(search.value);
  search.value = "";
});
const lastCity = localStorage.getItem("lastcity");
if (lastCity) {
  checkWeather(lastCity);
}
