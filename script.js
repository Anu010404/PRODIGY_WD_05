const apiKey = "438dac656fb2462205d337a39447596a"; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById("weatherInfo");
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  const location = locationInput.value;

  if (location.trim() === "") {
    alert("Please enter a location.");
    return;
  }

  fetchWeather(location);
});

function fetchWeather(location) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const temperature = (data.main.temp - 273.15).toFixed(2); // Convert temperature to Celsius
      const description = data.weather[0].description;
      const cityName = data.name;
      const country = data.sys.country;

      const weatherHTML = `
                <p><strong>Location:</strong> ${cityName}, ${country}</p>
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Description:</strong> ${description}</p>
            `;

      weatherInfo.innerHTML = weatherHTML;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert(
        "An error occurred while fetching weather data. Please try again later."
      );
    });
}
