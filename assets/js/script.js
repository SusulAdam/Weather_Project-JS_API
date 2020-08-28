const enterCityName = document.querySelector('.enterCityName');
const getData = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure')

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=4eb97f6b950a298d1bfb58ff1ca40061';
const units = '&units=metric';
let url;

const getWeather = () => {
    city = (!enterCityName.value) ? 'New York' : enterCityName.value;

    url = apiLink + city + apiKey + units;

    fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res.main.pressure);
            const getTemperature = res.main.temp;
            const getHumidity = res.main.humidity;
            const getPressure = res.main.pressure
            const getStatus = Object.assign({}, ...res.weather)

            const id = getStatus.id
            cityName.textContent = res.name;
            weather.textContent = getStatus.main

            temperature.textContent = Math.floor(getTemperature) + '[°C]';
            humidity.textContent = getHumidity + '[%]';
            pressure.textContent = getPressure + '[hPa]'

            warning.textContent = '';
            enterCityName.value = '';

            if (id >= 200 && id <= 232) {
                photo.setAttribute('src', "assets/WeatherApp+grafiki/WeatherApp grafiki/thunderstorm.png");
            } else if (id >= 300 && id <= 321) {
                photo.setAttribute('src', "assets/WeatherApp+grafiki/WeatherApp grafiki/drizzle.png");
            } else if (id >= 500 && id <= 521) {
                photo.setAttribute('src', "assets/WeatherApp+grafiki/WeatherApp grafiki/rain.png");
            } else if (id >= 600 && id < 700) {
                photo.setAttribute('src', "assets/WeatherApp+grafiki/WeatherApp grafiki/ice.png");
            } else if (id >= 801 && id <= 804) {
                photo.setAttribute('src', "assets/WeatherApp+grafiki/WeatherApp grafiki/cloud.png");
            } else if (id === 800) {
                photo.setAttribute('src', "assets/WeatherApp+grafiki/WeatherApp grafiki/sun.png");
            } else if (id >= 700 && id < 800) {
                photo.setAttribute('src', "assets/WeatherApp+grafiki/WeatherApp grafiki/fog.png");
            } else {
                photo.setAttribute('src', "assets/WeatherApp+grafiki/WeatherApp grafiki/unknown.png");
            }

        }).catch(() => warning.textContent = 'Please enter a valid city name')
};

getWeather()

const enterCheck = () => {
    if (event.keyCode === 13) {
        getWeather()
    }
}
getData.addEventListener('click', getWeather);
enterCityName.addEventListener('keyup', enterCheck);
