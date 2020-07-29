const input = document.querySelector('input');
const btn = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=4eb97f6b950a298d1bfb58ff1ca40061';
const units = '&units=metric';
let url;

const getWeather = () => {
    city = (!input.value) ? 'New York' : input.value;

    url = apiLink + city + apiKey + units;

    axios.get(url)
        .then(res => {
            const temp = res.data.main.temp;
            const hum = res.data.main.humidity;
            const status = Object.assign({}, ...res.data.weather)
            const id = status.id
            cityName.textContent = res.data.name;
            weather.textContent = status.main
            temperature.textContent = Math.floor(temp) + '°C';
            humidity.textContent = hum + '%';

            warning.textContent = '';
            input.value = '';

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
getWeather();

const enterCheck = () => {
    if (event.keyCode === 13) {
        getWeather()
    }
}
btn.addEventListener('click', getWeather);
input.addEventListener('keyup', enterCheck);
