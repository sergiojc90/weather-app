    (function weatherApp() {

        // Defining main constants
        const btn = document.getElementById("search-btn");
        const cityName = document.getElementById("cityName");
        const countries = document.getElementById("countries");

        // Main events on page load
        btn.addEventListener("click",validateData);
        window.addEventListener("onload",getData("london","uk","metric"));
        window.addEventListener("keyup", function(event){
            if (event.keyCode == 13){
                return validateData();
            }
        });

        // Function to validate that the user has entered a city and a country.
        // The app requires a country due to the duplicated city names in diferent countries.
        function validateData(){
            if(cityName.value === "" || countries.value === "") return alert("Choose a city and a country");

            getData(cityName.value, countries.value,"metric");
        }

        // Function to display the weather data in the DOM
        function displayDom(weatherObject) {
            const icon = document.getElementById("icon");
            const temperature = document.getElementById("temperature");
            const city = document.getElementById("city");
            const country = document.getElementById("country");
            const humidity = document.getElementById("humidity");
            const wind = document.getElementById("wind");

            // The URL of the icon is provided in https://openweathermap.org/weather-conditions
            icon.src = `http://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`;
            city.textContent = weatherObject.name;
            country.textContent = weatherObject.sys.country;
            temperature.textContent = weatherObject.main.temp + "°C";
            humidity.textContent = "Humidity: " + weatherObject.main.humidity + "%";
            wind.textContent = "Wind: " + weatherObject.wind.speed + "km/h";
        }

        // Asyncronous function to fetch API data, it uses the name of a city, the country and the units (metric or imperial)
        async function getData(cityName,country,units){
            const weatherKey = "c61e36e895bb91ce2746c1c42d97aa6f";
            const response = await fetch(`http://api.openweathermap.org/data/2.5/find?q=${cityName},${country}&units=${units}&appid=${weatherKey}`,{mode:"cors"});
            
            //Basic request status validation, if the status is not 200 OK, there is going to be a alert for the user and the function is going to stop execution
            if(response.status !== 200) return alert("Ooops, something went wrong, try again")
            
            // If the response is 200, we are going to fetch the weather data
            const weatherData = await response.json();

            // Validate that there is at least one city with the provided name in the country
            if (weatherData.count === 0) return alert("There is no such city in that country :p");

            //Getting the firs city object of the array of cities provided by the API
            const weatherObject = weatherData.list[0];

            //  Display the weather object in the DOM
            return displayDom(weatherObject);
        }
    })();
