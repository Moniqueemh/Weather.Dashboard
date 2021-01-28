const APIKEY = '9597c88cd097acdb1c2707d38fbd78af';


let date = new Date();
getCurrentForcast("Las Vegas")

function getCurrentForcast(city) {
    // gets humidity, temp, wind, uv and posts to page
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKEY
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        let temp = response.main.temp;
        let humidity = response.main.humidity;
        let wind = response.wind.speed;

        let tempDisplay = $("<p>").text(temp + " F");
        let windDisplay = $("<p>").text(wind + " MPH");
        let humidityDisplay = $("<p>").text(humidity + " %");

        $("#current-area").append(tempDisplay, windDisplay, humidityDisplay)

        getUV(response.coord.lat, response.coord.lon)
    });
};


function getUV(lat, lon) {

    let url = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKEY

    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        let uvIndex = response.value;
        let uvDispaly = $("<p>").text(uvIndex);

        $("#current-area").append(uvIndex)
    });
}