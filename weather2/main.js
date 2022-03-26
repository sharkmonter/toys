async function formatWeather(o)
{
    for(let x in o.periods)
    {
        let name = document.getElementById("futureName");
        let temp = document.getElementById("futureTemp");
        let condition = document.getElementById("futureCondition");
        let wind = document.getElementById("futureWind");
        let detail = document.getElementById("futureDetail");

        name.textContent = `${o.periods[x].name}`;
        temp.textContent = `${o.periods[x].temperature}°F`;
        condition.textContent = `${o.periods[x].shortForecast}`;
        wind.textContent = `Wind: ${o.periods[x].windSpeed} ${o.periods[x].windDirection}`;
        detail.textContent = `${o.periods[x].detailedForecast}`;

        await new Promise(r => setTimeout(r, 12000));
    }

    getCurrentConditions();
    getWeatherReport();
}

async function formatCurrentConditions(o)
{
    let temp = document.getElementById("currentTemp");
    let condition = document.getElementById("currentCondition");
    let wind = document.getElementById("currentWind");
    let dewpoint = document.getElementById("currentDewpoint");
    let humidity = document.getElementById("currentHumidity");

    temp.textContent = `${Math.round(o.properties.temperature.value * 9/5) + 32}°F`;
    condition.textContent = `${o.properties.textDescription}`;
    wind.textContent = `Wind: ${Math.round(o.properties.windSpeed.value)} km/h`;
    dewpoint.textContent = `Dewpoint: ${Math.round(o.properties.dewpoint.value * 9/5) + 32}°F`;
    humidity.textContent = `Humidity: ${Math.round(o.properties.relativeHumidity.value)}%`;
}

function getWeatherReport()
{
    //https://api.weather.gov/points/28.71,-81.31 is winter springs
    let area = "https://api.weather.gov/gridpoints/MLB/27,76/forecast";

    getAPI(area).then(data => {formatWeather(data.properties)});
}

function getCurrentConditions()
{
    let currentConditions = "https://api.weather.gov/stations/KSFB/observations/latest";
    
    getAPI(currentConditions).then(data => {formatCurrentConditions(data)});
}

async function getAPI(url)
{
    return response = await fetch(url).then(response => response.json());
}

getCurrentConditions();
getWeatherReport();
