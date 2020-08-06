let city                = 'New York';
let celsius             = 'metric';
let fahrenheit          = 'imperial';
let switchCityBtn       = document.querySelector('#changeCity');
let switchTempUnityBtn  = document.querySelector('#changeTempUnity');
// Regler problème
let tempUnity           = document.querySelectorAll('.weather__temp-unity');

receiveTemperature(city);

switchCityBtn.addEventListener('click', () => {
  // créer un input en HTML qu'on cache et qu'on active uniquement au click
  // --------> ICI <---------
  city = prompt('Enter a city :');
  receiveTemperature(city);
});

// Créer un addEventListener switchTempUnity --> au click
switchTempUnityBtn.addEventListener('click', () => {
  // Faire la condition ici + stocker dans une variable la grosse partie de l'url?
  // --------> ICI <---------
  url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=467a1480cc6bf31722891e57ffb7cf35&units=' + fahrenheit;
  tempUnity.textContent = '°F';
});


function roundedNumber(value) {
  return Math.round(value * 10) / 10;
};

function receiveTemperature(city) {

  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=467a1480cc6bf31722891e57ffb7cf35&units=' + celsius;

  let request = new XMLHttpRequest();

  request.open('GET', url);
  request.responseType = 'json';
  request.send();


  request.onload = function() {
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
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