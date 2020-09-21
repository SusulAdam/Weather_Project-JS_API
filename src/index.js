import './styles/index.scss';
import date from './js/HandleDate';

const importAll = require =>
    require.keys().reduce((acc, next) => {
        acc[next.replace("./", "")] = require(next);
        return acc;
    }, {});

const images = importAll(
    require.context("./images", false, /\.(png|jpe?g|svg)$/)
);


const enterCityName = document.querySelector('.enterCityName');
const getData = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const weatherAppSection = document.querySelector('.weather-APP');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=4eb97f6b950a298d1bfb58ff1ca40061';
const units = '&units=metric';
const microphone = document.querySelector('.microphone');

let url;
let activeMicrophone = false
let desactiveMicrophone = true
let city;
let copyactive;



const handleRecognitionSpeech = function () {
    microphone.addEventListener('click', function () {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.interimResults = true;

        recognition.addEventListener('result', e => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            enterCityName.value = transcript;
        })

        copyactive = activeMicrophone
        activeMicrophone = desactiveMicrophone
        desactiveMicrophone = copyactive
        console.log(activeMicrophone);
        if (activeMicrophone === true) {
            recognition.start();
            recognition.addEventListener('end', recognition.start);
            microphone.innerHTML = '<i class="fas fa-microphone-slash"></i>'
            recognition.addEventListener('end', getWeather);
        } else {
            microphone.innerHTML = '<i class="fas fa-microphone"></i>'
            location.reload();
        }
    })

}

handleRecognitionSpeech()


const getWeather = () => {

    city = (!enterCityName.value) ? 'New York' : enterCityName.value;
    url = apiLink + city + apiKey + units;

    fetch(url)
        .then(res => res.json())
        .then(res => {
            const getTemperature = res.main.temp;
            const getHumidity = res.main.humidity;
            const getPressure = res.main.pressure
            const getStatus = Object.assign({}, ...res.weather)

            const id = getStatus.id
            cityName.textContent = res.name;
            weather.textContent = getStatus.main

            temperature.textContent = Math.floor(getTemperature) + '°';
            humidity.textContent = `Humidity: ${getHumidity}%`;
            pressure.textContent = ` Pressure: ${getPressure}hPa`

            warning.textContent = '';
            // enterCityName.value = ''; // additional options it is possible to turn on, it clear input when respone from api is accept

            if (id >= 200 && id <= 232) {
                photo.setAttribute('src', `{${images['thunderstorm.png'].default}}`);
                weatherAppSection.style.backgroundImage = `url(${images['thunderstormBackground.png'].default})`;
            } else if (id >= 300 && id <= 321) {
                photo.setAttribute('src', `${images['drizzle.png'].default}`);
                weatherAppSection.style.backgroundImage = `url(${images['drizzleBackground.png'].default})`;
            } else if (id >= 500 && id <= 521) {
                photo.setAttribute('src', `${images['rain.png'].default}`);
                weatherAppSection.style.backgroundImage = `url(${images['rainBackground.png'].default})`;
            } else if (id >= 600 && id < 700) {
                photo.setAttribute('src', `${images['ice.png'].default}`);
                weatherAppSection.style.backgroundImage = `url(${images['iceBackground.png'].default})`;
            } else if (id >= 801 && id <= 804) {
                photo.setAttribute('src', `${images["cloud.png"].default}`);
                weatherAppSection.style.backgroundImage = `url(${images['cloudBackground.png'].default})`;
            } else if (id === 800) {
                photo.setAttribute('src', `${images['sun.png'].default}`);
                weatherAppSection.style.backgroundImage = `url(${images['sunBackground.png'].default})`;
            } else if (id >= 700 && id < 800) {
                photo.setAttribute('src', `${images['fog.png'].default}`);
                weatherAppSection.style.backgroundImage = `url(${images['fogBackground.png'].default})`;
            } else {
                photo.setAttribute('src', `${images['unknown.png'].default}`);
                weatherAppSection.style.backgroundImage = `url(${images['unknownBackground.png'].default})`;
            }
        }).catch(() => warning.textContent = 'Please enter a valid city name')
};

getWeather()

const enterCheck = (enterClick) => {
    if (enterClick.keyCode === 13) {
        getWeather()
    }
}
getData.addEventListener('click', getWeather);
enterCityName.addEventListener('keyup', enterCheck);



