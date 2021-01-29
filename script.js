
const APIKEY = '9597c88cd097acdb1c2707d38fbd78af';

const history = [];

let date = new Date();
//getCurrentForcast("Las Vegas")

function getCurrentForcast(city) {
    $("#five-day-area").empty();
    $("#current-area").empty();


    // gets humidity, temp, wind, uv and posts to page
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKEY
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        //console.log(response)
        let temp = response.main.temp;
        let humidity = response.main.humidity;
        let wind = response.wind.speed;

        let cityDisplay = $("<h6>").text(city);
        let tempDisplay = $("<p>").text(temp + " F");
        let windDisplay = $("<p>").text(wind + " MPH");
        let humidityDisplay = $("<p>").text(humidity + " %");

        $("#current-area").append(cityDisplay, tempDisplay, windDisplay, humidityDisplay)

        getUV(response.coord.lat, response.coord.lon);
        getForcastFiveDays(response.coord.lat, response.coord.lon);
    });
};

function getForcastFiveDays(lat, lon) {

    let url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=" + APIKEY;

    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        //console.log(response)

        const dailies = response.daily;
        for (let i = 1; i < 6; i++) {
            const daily = dailies[i];

            let card = $("<div class='col card'>");
            let dateOb = moment(daily.dt * 1000)
            //console.log(dateOb)
            let date = $("<p>").text(dateOb.format('L'));
            let icon = $("<img>").attr('src', "http://openweathermap.org/img/wn/" + daily.weather[0].icon + "@2x.png");
            let temp = $("<p>").text("Temp: " + daily.temp.day);
            let humidity = $("<p>").text("Humidity: " + daily.humidity + " %");

            card.append(date, icon, temp, humidity);
            $("#five-day-area").append(card);
        }
    });

};

function getUV(lat, lon) {

    let url = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKEY

    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        //console.log(response)

        let uvIndex = response.value;
        let uvDisplay = $("<p>").text(uvIndex);

        $("#current-area").append(uvDisplay);

    });
};

function historyButton() {
    $("#history-area").empty();
    for (let i = 0; i < history.length; i++) {
        let button = $("<button class='city-button'>").text(history[i]).attr('data-city', history[i])
        $("#history-area").append(button)
    };
}

$("#search").click(function (event) {
    let city = $("#city").val();
    history.push(city)
    console.log(history)
    historyButton()
    getCurrentForcast(city);
});

$(document).on('click','.city-button', function(event){
    let city = $(this).attr('data-city');
    getCurrentForcast(city);
})