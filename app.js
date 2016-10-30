document.addEventListener('DOMContentLoaded', function () {

  var name = document.getElementById('cityName');
  var t = document.getElementById('temperature');
  var icon = document.getElementById('icon');
  var weather = document.getElementById('weather');
  var btnGeoloc = document.getElementById('btn-geoloc');
  var btnCity = document.getElementById('btn-city');
  var inputBox = document.getElementById('citySearch');
  var apiKey = '277b74aa77fdfe56ca1ebdf913639f93';
  var form = document.getElementById('form1');

  //loading screen
  function loading() {
    name.innerHTML = '<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>';
    t.innerHTML = '';
    icon.innerHTML = '';
    weather.innerHTML = '';
    inputBox.value = '';
  };

  //displaying results from openweatherapi
  function view(results) {
    name.innerHTML = results.name;
    var temp = results.main.temp.toFixed(0);
    t.innerHTML = temp + '&deg;C';
    icon.innerHTML = '<img src="http://openweathermap.org/img/w/' + results.weather[0].icon + '.png" width = "90px">'
    weather.innerHTML = results.weather[0].main;
  };

  //getting data using geolocalisation
    function getByGeoloc() {
      loading();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        name.innerHTML = 'your browser doesn\'t support geolocation';
      }

      function showPosition(position) {
        fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=metric&appid=' + apiKey).then(function(response) {
          if (response.status !== 200) {
            console.log('problem: ' + response.status);
          }
          response.json().then(function(data) {
            view(data);
          });
        }).catch(function(err) {
          console.log('fetch error: ', err);
        });
      }
    };

    //getting data using city name from input box
    function getByCityName() {
      var search = inputBox.value;
      loading();

      fetch('http://api.openweathermap.org/data/2.5/weather?q=' + search + '&units=metric&appid=' + apiKey).then(function(response) {
        if (response.status !== 200) {
          console.log('problem: ' + response.status);
          console.log('try again.');
          t.innerHTML = '<p>Wrong city name.</p>';
        }
        response.json().then(function(data) {
          view(data);
        });
      }).catch(function(err) {
        console.log('fetch error: ', err);
      });
    };

    //actions performed when button is clicked or enter pressed
    btnGeoloc.addEventListener('click', getByGeoloc, false);
    btnCity.addEventListener('click', getByCityName, false);
    form.addEventListener('keypress', function(event) {
      if (event.keyCode == 13) {
        getByCityName();
      }
    });
}, false);
