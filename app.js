import { darkModeModule } from './modules/darkmode.js';

"use strict";

let city;
let currentCity;
let celsius             = 'metric';
let fahrenheit          = 'imperial';
let currentUnity        = fahrenheit;
var url					        = '';
let slideOpen           = false;
let heightChecked       = false;
let initHeight          = 0;
let switchCityBtn       = document.querySelector('#changeCity');
let switchTempUnity     = document.querySelector('#changeTempUnity');
let tempUnity           = document.querySelectorAll('.tempUnity');
let form				        = document.querySelector('#form');
let input				        = document.querySelector('#changeCityInput');
let arrow               = document.querySelector('#arrow');

// currentCity = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=467a1480cc6bf31722891e57ffb7cf35&units=';

// url = currentCity + currentUnity;

arrow.style.display = 'none';
geolocationWeather();
darkModeModule();

function geolocationWeather() {
  if('geolocation' in navigator) {
    navigator.geolocation.watchPosition((position) => {
      currentCity = 'https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude + '&lat=' + position.coords.latitude + '&appid=467a1480cc6bf31722891e57ffb7cf35&units=';
      
      url = currentCity + currentUnity;

      let request = new XMLHttpRequest();

      request.open('GET', url);
      request.responseType = 'json';
      request.send();


      request.onload = function() {
        if(request.readyState === request.DONE && request.status === 200) {
          let temperature        = request.response.main.temp;
          let feelsLike          = request.response.main.feels_like;
          let cityName           = request.response.name;
          let icon               = request.response.weather[0].icon;
          let description        = request.response.weather[0].description;
          let tempMin            = request.response.main.temp_min;
          let tempMax            = request.response.main.temp_max;
          let windSpeed          = request.response.wind.speed;
          
          let temperatureRounded = roundedNumber(temperature);
          let feelsLikeRounded   = roundedNumber(feelsLike);
          let tempMinRounded     = roundedNumber(tempMin);
          let tempMaxRounded     = roundedNumber(tempMax);
          let windSpeedRounded   = roundedNumber(windSpeed);

          document.querySelector('#temp').textContent         = temperatureRounded;
          document.querySelector('#feelsLike').textContent    = feelsLikeRounded;
          document.querySelector('#city').textContent         = cityName;
          document.querySelector('#icon').src                 = "http://openweathermap.org/img/wn/" + icon + "@4x.png";
          document.querySelector('#description').textContent  = description;
          document.querySelector('#tempMin').textContent      = tempMinRounded;
          document.querySelector('#tempMax').textContent      = tempMaxRounded;
          document.querySelector('#windSpeed').textContent    = windSpeedRounded;
          }
        else {
            alert('Oops, something went wrong.');
        }
      }  
    }, error, options);
  }
  else {
    error();
  }
};

var options = {
  enableHighAccuracy: true
}

function error() {
  city = 'Paris';
  receiveTemperature(city);
}

// Faire disparaitre la tête de fleche du formulaire
function arrowTimeOut() {
  arrow.style.display = 'none';
}

// Animation formulaire
function slideToggle() {
    if(!heightChecked) {
        initHeight    = form.offsetHeight;
        heightChecked = true;
    }
    if(!slideOpen) {
        slideOpen           = true;
        form.style.height   = '100px';
        arrow.style.display = 'block';
        
    }
    else {
        slideOpen         = false;
        form.style.height = initHeight + 'px';
        setTimeout(arrowTimeOut, 250);
    }
};

function changeTempUnity() {
	for(let i = 0; i < tempUnity.length; i++) {

		if(tempUnity[i].textContent === '°C') {
      tempUnity[i].textContent  = '°F';
      currentUnity = fahrenheit;
      url = currentCity + currentUnity;

		}
		else {
      tempUnity[i].textContent = '°C';
      currentUnity = celsius;
      url = currentCity + currentUnity;
    }
  };
  if (currentCity == 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=467a1480cc6bf31722891e57ffb7cf35&units=') {
    receiveTemperature();
  }
  else {
    geolocationWeather();
  }
};


function roundedNumber(value) {
  return Math.round(value * 10) / 10;
};

function receiveTemperature(currentCity) {
  currentCity = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=467a1480cc6bf31722891e57ffb7cf35&units=';
  url = currentCity + currentUnity;

  let request = new XMLHttpRequest();

  request.open('GET', url);
  request.responseType = 'json';
  request.send();


  request.onload = function() {
    if(request.readyState === request.DONE && request.status === 200) {
      let temperature        = request.response.main.temp;
      let feelsLike          = request.response.main.feels_like;
      let cityName           = request.response.name;
      let icon               = request.response.weather[0].icon;
      let description        = request.response.weather[0].description;
      let tempMin            = request.response.main.temp_min;
      let tempMax            = request.response.main.temp_max;
      let windSpeed          = request.response.wind.speed;
      
      let temperatureRounded = roundedNumber(temperature);
      let feelsLikeRounded   = roundedNumber(feelsLike);
      let tempMinRounded     = roundedNumber(tempMin);
      let tempMaxRounded     = roundedNumber(tempMax);
      let windSpeedRounded   = roundedNumber(windSpeed);

      document.querySelector('#temp').textContent         = temperatureRounded;
      document.querySelector('#feelsLike').textContent    = feelsLikeRounded;
      document.querySelector('#city').textContent         = cityName;
      document.querySelector('#icon').src                 = "http://openweathermap.org/img/wn/" + icon + "@4x.png";
      document.querySelector('#description').textContent  = description;
      document.querySelector('#tempMin').textContent      = tempMinRounded;
      document.querySelector('#tempMax').textContent      = tempMaxRounded;
      document.querySelector('#windSpeed').textContent    = windSpeedRounded;
      }
    else {
        alert('Oops, something went wrong.');
    }
  }  
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	if(input.value == '') {
		input.style.borderBottom = '2px solid red';
	}
	else {
		input.style.borderBottom = '2px solid grey'
		city = input.value;
		input.value = '';
		receiveTemperature(currentCity);
	}
});

switchCityBtn.addEventListener('click', () => {
	slideToggle();
});

switchTempUnity.addEventListener('mouseover', () => {
	if(switchTempUnity.textContent === '°C') {
		switchTempUnity.textContent  = '°F';
	}
	else if (switchTempUnity.textContent === '°F') {
		switchTempUnity.textContent        = '°C';
	}
});

switchTempUnity.addEventListener('mouseout', () => {
	if(switchTempUnity.textContent === '°F') {
		switchTempUnity.textContent  = '°C';
	}
	else if (switchTempUnity.textContent === '°C') {
		switchTempUnity.textContent        = '°F';
	}
});
  
switchTempUnity.addEventListener('click', () => {
  changeTempUnity();
});

