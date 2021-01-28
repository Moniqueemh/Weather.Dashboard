const APIKEY = '9597c88cd097acdb1c2707d38fbd78af';

let city = "Dallas";
let date = new Date();

let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKEY
$.ajax({
    url: url,
    method: "GET"
}).then(function(response) {
    console.log(response)
    let temp = response.main.temp;
    let humidity = response.main.humidity;
    let wind = response.wind.speed;

    let tempDisplay = $("<p>").text(temp + " F");
    let windDisplay = $("<p>").text(wind + " MPH");
    let humidityDisplay = $("<p>").text(humidity + " %");

    $("#current-area").append(tempDisplay, windDisplay, humidityDisplay)
    let uv = "";
});