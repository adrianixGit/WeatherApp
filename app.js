const degree = document.querySelector('.degree');
const cityName = document.querySelector('.city');
const windParameters = document.querySelector('.wind');
const textInput = document.querySelector('.text-input')
const checkBtn = document.querySelector('.check')

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
.then(({name, main, wind}) => {
    let temperatur = Math.round(main.temp)
    cityName.innerHTML = name;
    degree.innerHTML = temperatur + '&#8451';
    windParameters.innerHTML = wind.speed + 'm/s';
});
}

const checkWeather = (e) => {
    e.preventDefault()
    city = textInput.value
    inquiryAPI()
}

checkBtn.addEventListener('click', checkWeather)