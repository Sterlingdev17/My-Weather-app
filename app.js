$(document).ready(function () {
    // we dinining an array for the city
    var cityHistory = JSON.parse(localStorage.getItem("cityHistory"))
    // if there no city stored in localstorage set the cityhistory to be an empty array
    if (cityHistory === null) {
        // store city history in array
        cityHistory = [];
    }
    console.log(cityHistory)
    //target search button
    $("#search").click(function (e) {
        e.preventDefault();
      


        // link search button with input user
        var cityName = $("#userInput").val()

        if (cityHistory.indexOf(cityName) === -1){
            cityHistory.push(cityName)
            localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
        }
        console.log(cityHistory)

        // save input user in to a variable
       
        // var cityName = "orlando"
        var APIKey = "aae4376102bf6879909c9113d9e4e86e";
        //Get information from API for weather
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // change kelvin to Fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            console.log(tempF.toFixed(0));
            // append the city name on the page
            $(".City").append(response.name);
            // appending sky description.
            //$(".description").append(response[1].Description);

            // appending temperature on the page
            $(".temp").append("Temperature: ", + tempF.toFixed(0)," ºF");
            // appending Huminity on the page
            $(".hum").append("Humidity: ", + response.main.humidity, " %");
            // appending wind speed on the page
            $(".wind").append("wind Speed: ", + response.wind.speed);


            $("#search").empty();
        })
        
        
        
 
        // get information from for forecast  
        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {
            console.log(response)
        })
       
    })

});


































