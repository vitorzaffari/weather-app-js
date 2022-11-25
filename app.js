const notification = document.querySelector('.notification');
const icon = document.querySelector('.weather-icon');
const tempValue = document.querySelector('.temp-value p');
const tempDescription = document.querySelector('.temp-description p');
const locationName = document.querySelector('.location p');

const weather = {}

weather.temperature = {
    unit: "celsius"
}


//api
const KELVIN = 273;
const key = "API key";

//geolocation
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)
} else {
    notification.style.display = "block";
    notification.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>"
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

function showError(error) {
    notification.style.display = "block";
    notification.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api)

        fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        })

    }


    //clickevents
    tempValue.addEventListener('click', function () {
        if (weather.temperature.value === undefined ) return ;
        if (weather.temperature.unit === "celsius") {
            let tempCelsius = weather.temperature.value;
            let tempFahrenheit = Math.floor((tempCelsius * 9 / 5) + 32);
            tempValue.innerHTML = `${tempFahrenheit} °<span>F</span>`
            weather.temperature.unit = "fahrenheit";
        } else {
            tempValue.innerHTML = `${weather.temperature.value} °<span>C</span>`
            weather.temperature.unit = "celsius";
        }
    })



    //functions

    function displayWeather() {
        icon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`
        tempValue.innerHTML = `${weather.temperature.value} °<span>C</span>`
        tempDescription.innerHTML = `${weather.description}`
        locationName.innerHTML = `${weather.city} - ${weather.country}`
    }

