    (function searchCity() {
        const btn = document.getElementById("search-btn");
        const cityName = document.getElementById("cityName");
        const countries = document.getElementById("countries");

        window.addEventListener("onload",getData("london","uk","metric"));
        btn.addEventListener("click",validateData);

        function validateData(){
            if(cityName.value === "" || countries.value === "") return console.log("Choose a city and a country");

            getData(cityName.value, countries.value,"metric");
        }

        function displayDom(weatherObject) {
            const icon = document.getElementById("icon");
            const temperature = document.getElementById("temperature");
            const city = document.getElementById("city");
            const country = document.getElementById("country");
            const humidity = document.getElementById("humidity");
            const wind = document.getElementById("wind");

            icon.src = `http://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`;
            city.textContent = weatherObject.name;
            country.textContent = weatherObject.sys.country;
            temperature.textContent = "Temperature: " + weatherObject.main.temp + "°C";
            humidity.textContent = "Humidity: " + weatherObject.main.humidity + "%";
            wind.textContent = "Wind: " + weatherObject.wind.speed + "km/h";
        }

        async function getData(cityName,country,units){
            const weatherKey = "c61e36e895bb91ce2746c1c42d97aa6f";
            const response = await fetch(`http://api.openweathermap.org/data/2.5/find?q=${cityName},${country}&units=${units}&appid=${weatherKey}`,{mode:"cors"});
            
            if(response.status !== 200) return alert("Ooops, something went wrong, try again")
            
            const weatherData = await response.json();

            if (weatherData.count === 0) return alert("There is no such city in that country :p");

            const weatherObject = weatherData.list[0];
            displayDom(weatherObject);

            return weatherData;
        }
    })();
