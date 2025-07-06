// Weather App Script
// Paste your OpenWeather API key below
const apiKey = "221f3ded1c7b612573a755b648b37668";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".Wind");
const pressure = document.querySelector(".pressure");
const visibility = document.querySelector(".visibility");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const windDir = document.querySelector(".windDir");

function getWindDirection(deg) {
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return dirs[Math.round(deg / 45) % 8];
}

function formatTime(unix, timezone) {
    const date = new Date((unix + timezone) * 1000);
    return date.toUTCString().match(/\d{2}:\d{2}/)[0];
}

async function checkWeather(cityName) {
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
    if (response.status == 404) {
        alert("City not found");
        return;
    }
    const data = await response.json();
    city.textContent = data.name;
    temp.textContent = Math.round(data.main.temp) + "°C";
    humidity.textContent = data.main.humidity + "%";
    wind.textContent = Math.round(data.wind.speed * 3.6) + "km/h";
    pressure.textContent = data.main.pressure + " hPa";
    visibility.textContent = (data.visibility / 1000).toFixed(1) + " km";
    sunrise.textContent = formatTime(data.sys.sunrise, data.timezone - 3600);
    sunset.textContent = formatTime(data.sys.sunset, data.timezone - 3600);
    windDir.textContent = getWindDirection(data.wind.deg);

    // Set weather icon
    const iconMap = {
        "01d": "clear.png",
        "01n": "clear.png",
        "02d": "clouds.png",
        "02n": "clouds.png",
        "03d": "clouds.png",
        "03n": "clouds.png",
        "04d": "clouds.png",
        "04n": "clouds.png",
        "09d": "drizzle.png",
        "09n": "drizzle.png",
        "10d": "rain.png",
        "10n": "rain.png",
        "11d": "rain.png",
        "11n": "rain.png",
        "13d": "snow.png",
        "13n": "snow.png",
        "50d": "mist.png",
        "50n": "mist.png"
    };
    const icon = data.weather[0].icon;
    weatherIcon.src = "images/" + (iconMap[icon] || "clear.png");
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Optionally, load default city
// checkWeather("New York");
