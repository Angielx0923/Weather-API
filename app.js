let city                = 'New York';
let celsius             = 'metric';
let fahrenheit          = 'imperial';
var url					        = '';
let slideOpen           = false;
let heightChecked       = false;
let initHeight          = 0;
let switchCityBtn       = document.querySelector('#changeCity');
let switchTempUnityBtn  = document.querySelector('#changeTempUnity');
let tempUnity           = document.getElementsByClassName('weather__temp-unity');
let form				        = document.querySelector('#form');
let input				        = document.querySelector('#changeCityInput');
let submit				      = document.querySelector('#changeCitySubmit');
let arrow               = document.querySelector('#arrow');

arrow.style.display = 'none';

receiveTemperature(city);

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

function changeTempUnity(){
	for(let i = 0; i < tempUnity.length; i++) {

		if(tempUnity[i].textContent === '°C') {
			tempUnity[i].textContent  = '°F';
			url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=467a1480cc6bf31722891e57ffb7cf35&units=' + fahrenheit;
		}
		else {
			tempUnity[i].textContent = '°C';
			url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=467a1480cc6bf31722891e57ffb7cf35&units=' + celsius;
		}
	};
};

function roundedNumber(value) {
  return Math.round(value * 10) / 10;
};

function receiveTemperature(city) {

	url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=467a1480cc6bf31722891e57ffb7cf35&units=' + celsius;


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
		receiveTemperature(city);
	}
});

switchCityBtn.addEventListener('click', () => {
	slideToggle();
});

switchTempUnityBtn.addEventListener('mouseover', () => {
	if(switchTempUnityBtn.textContent === '°C') {
		switchTempUnityBtn.textContent  = '°F';
	}
	else if (switchTempUnityBtn.textContent === '°F') {
		switchTempUnityBtn.textContent        = '°C';
	}
});

switchTempUnityBtn.addEventListener('mouseout', () => {
	if(switchTempUnityBtn.textContent === '°F') {
		switchTempUnityBtn.textContent  = '°C';
	}
	else if (switchTempUnityBtn.textContent === '°C') {
		switchTempUnityBtn.textContent        = '°F';
	}
});
  
switchTempUnityBtn.addEventListener('click', () => {
	changeTempUnity();
});

