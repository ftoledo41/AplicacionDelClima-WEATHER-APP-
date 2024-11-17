// WEATHER APP
// https://home.openweather.co.uk/api_keys
// https://openweathermap.org/current

import weatherIcons from "./icons.js";
import {showSnackBar, noInternet, internetRestored} from "./utilities.js"

// 251. Solicitar datos a la API
// funcion para obtener el clima actual
async function getWeather() {
  const city = document.querySelector("#cityInput").value;
  const apiKey = "901c3f5d85f17c52734b6f17bd44cdbb";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es`;

  // crear spinner de carga
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");

  const resultsDiv = document.querySelector(".results");

  resultsDiv.appendChild(spinner);

  // retrasar la ejecucion de la llamada de la API
  setTimeout(async () => {
    try {
      // realizar solicitud http para obtener los datos del cliente
      const response = await fetch(url);
      const data = await response.json();

      // extraer los datos necesarios de la respuesta
      const cityName = data.name;
      const currentTempeture = kelvinToCelsius(data.main.temp);
      const weatherIcon = data.weather[0].icon;
      const countryName = data.sys.country;
      const description =
        data.weather[0].description.charAt(0).toUpperCase() +
        data.weather[0].description.slice(1);
      const currentDate = new Date().toLocaleString("es-ES", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });

      const minTemp = {
        celsius: kelvinToCelsius(data.main.temp_min),
        fahrenheit: celsiusToFahrenheit(kelvinToCelsius(data.main.temp_min)),
      };

      const maxTemp = {
        celsius: kelvinToCelsius(data.main.temp_max),
        fahrenheit: celsiusToFahrenheit(kelvinToCelsius(data.main.temp_max)),
      };

      // 252. Solicitar datos a la API (II)
      //mostrar los dartos obtneidos en la interfaz HTML
      document.querySelector("#cityName").textContent =
        cityName + ", " + countryName;
      document.querySelector("#currentDate").textContent = currentDate;
      document.querySelector("#weatherIcon").className =
        "fas " + weatherIcons[weatherIcon] + " fa-5x";
      document.querySelector("#description").textContent = description;
      document.querySelector("#currentTemp").textContent =
        currentTempeture +
        " °C " +
        "/ " +
        celsiusToFahrenheit(currentTempeture) +
        " °F";
      document.querySelector("#minTemp").textContent =
        "Min.: " +
        minTemp.celsius +
        " °C " +
        " / " +
        minTemp.fahrenheit +
        " °F";
      document.querySelector("#maxTemp").textContent =
        "Max.: " + maxTemp.celsius + " °C" + " / " + maxTemp.fahrenheit + " °F";

      // ocultar el spinner una vez obtenidos los datos
      spinner.style.display = "none";
    } catch (error) {
      console.log(error);
      document.querySelector("#cityName").textContent =
        "Se ha producido un error, por favor vuelve a intentarlo";
    } finally {
      // ocultar el spinner una vez obtenidos los datos
      spinner.style.display = "none";
    }
  }, 3000);

  // limpiar resultados anteriores
  document.querySelector("#cityName").textContent = "";
  document.querySelector("#currentDate").textContent = "";
  document.querySelector("#weatherIcon").className = "";
  document.querySelector("#description").textContent = "";
  document.querySelector("#currentTemp").textContent = "";
  document.querySelector("#minTemp").textContent = "";
  document.querySelector("#maxTemp").textContent = "";
}

// de kelvin a celsius
function kelvinToCelsius(temp) {
  return Math.round(temp - 273.15);
}

// de celsius a fahrenheit
function celsiusToFahrenheit(temp) {
  return Math.round((temp * 9) / 5 + 32);
}

// Evento para el boton "obtener clima"
const getWeatherBtn = document.querySelector("#getWeatherButton");
getWeatherBtn.addEventListener("click", getWeather);

document.querySelector("#cityInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather();
});

// detectamos cambios en la conexion a internet
window.addEventListener("offline", noInternet);
window.addEventListener("online", internetRestored);