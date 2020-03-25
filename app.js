$(document).ready(function () {
    // we dinining an array for the city
    var cityHistory = JSON.parse(localStorage.getItem("cityHistory"))
    // if there no city stored in localstorage set the cityhistory to be an empty array
    if (cityHistory === null) {
        // store city history in array
        cityHistory = [];
    }
    console.log(cityHistory)

    // var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    // console.log(utc);
    

   

   
    //target search button
    $("#search").click(function (e) {
        e.preventDefault();



        // link search button with input user
        var cityName = $("#userInput").val()

        if (cityHistory.indexOf(cityName) === -1) {
            cityHistory.push(cityName)
            localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
        }
        console.log(cityHistory)

        // save input user in to a variable
        var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        console.log(utc);
        // var cityName = "orlando"
        var APIKey = "aae4376102bf6879909c9113d9e4e86e";
        //Get information from API for weather
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $(".City").text("");
            $(".description").text("");
            $('#icon').empty();
            $('.temp').text("");
            $('.wind').text("");
            $('.hum').text("");


            console.log(response);
            console.log(response.main.temp);
            // change kelvin to Fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            console.log(tempF.toFixed(0));
            // append the city name on the page
            $(".City").text(response.name + " " + "(" +utc+")");
          
            // appending sky description.
            $(".description").text(response.weather[0].description);
            $('#icon').prepend(`<img id="theImg" src="https://openweathermap.org/img/wn/${response.weather[0].icon}.png"/>`)
            //console.log(response.weather[0].description);

            // appending temperature on the page
            $(".temp").text("Temperature: " + tempF.toFixed(0) + " ºF");
            // appending Huminity on the page
            $(".hum").text("Humidity: " + response.main.humidity + " %");
            // appending wind speed on the page
            $(".wind").text("wind Speed: " + response.wind.speed);
            


        })




        // get information from for forecast  
        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + APIKey;
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response2) {
            console.log(response2)
            $(".card").empty();

            console.log(response2.list[1]);
            var tempd = (response2.list[1].main.temp - 273.15) * 1.80 + 32;
            console.log(tempd);

           for (i = 0; i < response2.list.length; i++) {
               if (response2.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                console.log((response2.list[i].main.temp - 273.15) * 1.80 + 32); 
             
           
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var cardDate = $("<h5>").addClass("card-body").text(new Date(response2.list[i].dt_txt).toLocaleDateString());
            var cardImg = $("<img>").addClass("card-img").attr("src","http://openweathermap.org/img/w/"+response2.list[i].weather[0].icon + ".png");
            
            var cardtemp = $("<p>").addClass("card-text").text("Temperature: " +response2.list[i].main.temp_max)

            var cardHum = $("<p>").addClass("card-text").text("Humidity:" +response2.list[i].main.humidity);
            cardBody.append(cardDate,cardImg,cardtemp,cardHum);
            card.append(cardBody);
            $("#forecast").append(card);

               }
               
           }
           console.log(response2.list[8])
           // display the next 5 days

           // put tye following 5 day on the card

           // display the 5 days temperature forecast

           //$(".wind").append("wind Speed: ", + response2.listwind.speed);  
            




        })

    })

});


































