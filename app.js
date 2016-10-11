$(function () {
    var search = $('#citySearch').val('');
    //var coordinates = $('#coordinates');
    var name = $('#cityName');
    var t = $('#temperature');
    var icon = $('#icon');
    var weather = $('#weather');
    var apiKey = '277b74aa77fdfe56ca1ebdf913639f93';
    
    $('#btn-geoloc').on('click', function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            coordinates.html('your browser doesn\t support geolocation');
        }
        
        function showPosition(position) {
            /*coordinates.html('latitude: ' + position.coords.latitude + '<br>longitude: ' + position.coords.longitude);*/

            $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric&appid=" + apiKey, {}, function (data) {
                name.html(data.name);
                t.html(data.main.temp + '&deg;C');
                icon.html("<img src=\"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png\" width='90px'>");
                weather.html(data.weather[0].main);
            });
        }
    });
    
    $('#btn-city').on('click', function () {
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + search + "&units=metric&appid=" + apiKey, {}, function (data) {
            name.html(data.name);
            t.html(data.main.temp + '&deg;C');
            icon.html("<img src=\"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png\" width='90px'>");
            weather.html(data.weather[0].main);
        });
    });
});