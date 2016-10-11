$(function () {
    var c = $('#coordinates');
    var n = $('#cityName');
    var t = $('#temperature');
    var w = $('#weather');
    var call = $('#apiCall');
    var apiKey = '277b74aa77fdfe56ca1ebdf913639f93';
    
    $('#btn-geoloc').on('click', function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            c.html('your browser doesn\t support geolocation');
        }
        
        function showPosition(position) {
            c.html('latitude: ' + position.coords.latitude + '<br>longitude: ' + position.coords.longitude);
            
            call.attr('src', 'api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=' + apiKey);
            
            $.getJSON("api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + apiKey, {}, function (data) {
                n.html(data.name);
                t.html(data.main.temp);
                w.html(data.weather.main);
            });
        }
    });
});