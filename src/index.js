import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#locationCity').val();
    const state = $('#locationState').val()
    $('#locationCity').val("");
    $('#locationState').val("")

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${process.env.API_KEY1}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showCondition').text(`The condition in ${city} is ${response.weather[0].main}`);
      $('.showVisibility').text(`The visibility in ${city} is ${response.visibility}`);
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvin is ${response.main.temp} degrees.`);
      $('.showTempFeels').text(`The temperature in Kelvin feels like ${response.main.feels_like} degrees.`);
      $('.showTempFar').text(`The temperature in Farenheit is ${((((response.main.temp - 273.15)*9)/5)+32)} degrees.`);
      $('.showTempFarFeels').text(`The temperature in Farenheit feels like ${((((response.main.feels_like - 273.15)*9)/5)+32)} degrees.`);
      $('.showTempCelsius').text(`The temperature in Celsius is ${response.main.temp-273.15} degrees.`);
      $('.showTempHighFar').text(`The high in ${city} in Farenheit will be ${((((response.main.temp_max - 273.15)*9)/5)+32)}`);
      $('.showTempLowFar').text(`The low in ${city} in Farenheit will be ${((((response.main.temp_min - 273.15)*9)/5)+32)}`);

      
    }
  });
});