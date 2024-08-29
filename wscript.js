//http://api.weatherapi.com/v1/current.json?key=3ebaeb16a858438f9b0144855241308&q=Hyderabad&aqi=no

const baseUrl = "https://api.weatherapi.com";
const apiKey = "3ebaeb16a858438f9b0144855241308";

const temperatureField = document.querySelector(".temp");
const cityField = document.querySelector(".time_location p");
const dateField = document.querySelector(".time_location span");
const emojiField = document.querySelector(".weather_condition img");
const weatherField = document.querySelector(".weather_condition span");
const errorField = document.querySelector(".errorText");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (searchField.value) {
    getWeatherforCity(searchField.value);
  }
});

async function getWeatherforCity(city) {
  try {
    const response = await fetch(
      `${baseUrl}/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
    );
    const data = await response.json();

    if (!data.location) {
      throw new Error();
    }
    const { location, current } = data;
    const { name, localtime } = location;
    const {
      temp_c,
      condition: { icon, text },
    } = current;

    temperatureField.innerText = `${temp_c} °C`;
    cityField.innerText = name;
    dateField.innerText = localtime;
    emojiField.src = icon;
    weatherField.innerText = text;

    searchField.value = "";
    errorField.computedStyleMap.display = "none";
  } catch (err) {
    searchField.value = "";
    errorField.innerText = "Please, enter a valid location";
    errorField.style.display = "block";

    return;
  }
}
