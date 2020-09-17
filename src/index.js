import './styles/index.scss';





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
const pressure = document.querySelector('.pressure')

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=4eb97f6b950a298d1bfb58ff1ca40061';
const units = '&units=metric';
const microphone = document.querySelector('.microphone');


let url;
let activeMicrophone = false
let desactiveMicrophone = true
let city;
let copyactive;



window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    console.log(transcript);

    enterCityName.value = transcript

    if (e.results[0].isFinal) {
        enterCityName.value = transcript
    }

})


microphone.addEventListener('click', function () {
    copyactive = activeMicrophone
    activeMicrophone = desactiveMicrophone
    desactiveMicrophone = copyactive
    console.log(activeMicrophone);
    if (activeMicrophone === true) {
        microphone.innerHTML = ''
        recognition.start();
        recognition.addEventListener('end', recognition.start);
        microphone.innerHTML = '<i class="fas fa-microphone-slash"></i>'
    } else {
        location.reload();
    }
})



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

            temperature.textContent = Math.floor(getTemperature) + '[°C]';
            humidity.textContent = getHumidity + '[%]';
            pressure.textContent = getPressure + '[hPa]'

            warning.textContent = '';
            enterCityName.value = '';

            if (id >= 200 && id <= 232) {
                photo.setAttribute('src', `{${images['dthunderstorm.png'].default}}`);
            } else if (id >= 300 && id <= 321) {
                photo.setAttribute('src', `${images['drizzle.png'].default}`);
            } else if (id >= 500 && id <= 521) {
                photo.setAttribute('src', `${images['rain.png'].default}`);
            } else if (id >= 600 && id < 700) {
                photo.setAttribute('src', `${images['ice.png'].default}`);
            } else if (id >= 801 && id <= 804) {
                photo.setAttribute('src', `${images["cloud.png"].default}`);
            } else if (id === 800) {
                photo.setAttribute('src', `${images['sun.png'].default}`);
            } else if (id >= 700 && id < 800) {
                photo.setAttribute('src', `${images['fog.png'].default}`);
            } else {
                photo.setAttribute('src', `${images['unknown.png'].default}`);
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


recognition.addEventListener('end', getWeather);
