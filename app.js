$(function () {
    //var coordinates = $('#coordinates');
    var name = $('#cityName');
    var t = $('#temperature');
    var icon = $('#icon');
    var weather = $('#weather');
    var apiKey = '277b74aa77fdfe56ca1ebdf913639f93';

    $(window).on('keydown', function(e) {
      if (e.keyCode == 13) {
        e.preventDefault();
        return false;
      }
    });

    $('#btn-geoloc').on('click', function () {

        $('#citySearch').val('');
        name.html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>');
        t.html('');
        icon.html('');
        weather.html('');

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            coordinates.html('your browser doesn\t support geolocation');
        }

        function showPosition(position) {

            $.ajax({
                type: "GET",
                url: "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric&appid=" + apiKey,
                success: function (data) {
                    name.html(data.name);
                    var temp = data.main.temp;
                    var tempRound = temp.toFixed(0);
                    t.html(tempRound + '&deg;C');
                    icon.html("<img src=\"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png\" width='90px'>");
                    weather.html(data.weather[0].main);
                  },
                dataType: 'jsonp'
            });
        }
    });

    $('#btn-city').on('click keydown', function () {

        var search = $('#citySearch').val();
        name.html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>');
        t.html('');
        icon.html('');
        weather.html('');

        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&units=metric&appid=" + apiKey,
            success: function (data) {
                name.html(data.name);
                var temp = data.main.temp;
                var tempRound = temp.toFixed(0);
                t.html(tempRound + '&deg;C');
                icon.html("<img src=\"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png\" width='90px'>");
                weather.html(data.weather[0].main);
              },
            dataType: 'jsonp'
        });

        $('#citySearch').val('');
    });
});
