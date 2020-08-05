let city = 'New York';
let btn = document.querySelector('#changeCity');

receiveTemperature(city);

btn.addEventListener('click', () => {
  city = prompt('Enter a city :');
  receiveTemperature(city);
});

function receiveTemperature(city) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=467a1480cc6bf31722891e57ffb7cf35&units=metric';

  let request = new XMLHttpRequest();

  request.open('GET', url);
  request.responseType = 'json';
  request.send();


  request.onload = function() {
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        let temperature        = request.response.main.temp;
        let temperatureRounded = Math.round(temperature * 10) / 10;
        let cityName           = request.response.name;
        let icon               = request.response.weather.icon;
        let description        = request.response.weather.description;
        let tempMin            = request.response.main.temp_min;
        let tempMax            = request.response.main.temp_max;
        let windSpeed          = request.response.wind.speed;
        document.querySelector('#temp').textContent         = temperatureRounded;
        document.querySelector('#city').textContent         = cityName;
        document.querySelector('#icon').innerHTML           = "<img>${icon}";
        document.querySelector('#description').textContent  = description;
        document.querySelector('#tempMin').textContent      = tempMin;
        document.querySelector('#tempMax').textContent      = tempMax;
        document.querySelector('#windSpeed').textContent    = windSpeed;
      }
    else {
        alert('Oops, something went wrong.');
    }
  }  
}