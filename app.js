const degree = document.querySelector('.degree');
const cityName = document.querySelector('.city');
const windParameters = document.querySelector('.wind');
const textInput = document.querySelector('.text-input')
const checkBtn = document.querySelector('.check')
const pressureParameter = document.querySelector('.pressure')
const perceptibleDegree = document.querySelector('.perceptibleDegree')
const weatherConditions = document.querySelector('.weatherConditions');
const backgroundApp = document.querySelector('.backgroundApp');

const apiKey = `396386be9ec566cffc828f15d0cdb301`;
let city = ''

const inquiryAPI = () => {
const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pl&appid=${apiKey}&units=metric`;
fetch(api)
.then(response => {
    if(response.ok){
        return response
    }
})
.then(response => response.json())
.then(({name, main, weather, wind}) => {
    let temperature = Math.round(main.temp)
    let atmosphericConditions = '';
    weather.forEach(item => atmosphericConditions = item.main)
    cityName.innerHTML = 'Miasto: '+ name;
    degree.innerHTML = 'Temperatura: ' + temperature + '&#8451';
    perceptibleDegree.innerHTML = 'Odczuwalna temperatura: ' + main.feels_like + '&#8451';
    windParameters.innerHTML = 'Prędkość wiatru: ' + wind.speed + 'm/s';
    pressureParameter.innerHTML = 'Ciśnienie: ' + main.pressure + 'hPa';
    weatherConditions.innerHTML = 'Warunki pogodowe: ' + atmosphericConditions ;


    bgDay(temperature, atmosphericConditions)

});
}

const checkWeather = (e) => {
    e.preventDefault()
    city = textInput.value
    inquiryAPI()
}

checkBtn.addEventListener('click', checkWeather)

const createSnow = () => {
    const snowFlake = document.createElement('i');
    snowFlake.classList.add('snowFlakeClass')
    snowFlake.style.left = Math.random() * window.innerWidth + 'px';
    snowFlake.style.animationDuration = Math.random() * 5 + 3 + 's';
    snowFlake.style.opacity = Math.random();
    document.querySelector('.snow').appendChild(snowFlake)
    console.log(snowFlake)

    setTimeout(() => {
        snowFlake.remove()
    }, 8000)
}

const bgDay = (temperature, condition) => {
    if (temperature <= 10 && condition === 'Clouds'){
        backgroundApp.style.background = `url("images/cloudyBg.jpg")`;
        backgroundApp.classList.remove('snow')
    } else if(temperature <= 0 && condition === 'Snow'){
        backgroundApp.style.background = `url("images/snowingBg.jpg")`;
        backgroundApp.classList.add('snow');
        setInterval(createSnow, 50)
        //backgroundApp.classList.remove('snow')
        //createSnow.stop()
    } else if (condition === 'Mist'){
        backgroundApp.style.background = `url("images/mistBg.jpg")`;
        backgroundApp.classList.remove('snow')
    }
}




