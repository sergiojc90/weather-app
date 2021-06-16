    (function searchCity() {
        const btn = document.getElementById("search-btn");
        const cityName = document.getElementById("cityName");
        const countries = document.getElementById("countries");

        const icon = document.getElementById("icon");
        const temperature = document.getElementById("temperature");
        const city = document.getElementById("city");
        const country = document.getElementById("country");
        const humidity = document.getElementById("humidity");
        const wind = document.getElementById("wind");

        btn.addEventListener("click",render);

        function render(){
            if(cityName.value === "" || countries.value === "") return console.log("Choose a city and a country");

            getData(cityName.value, countries.value,"metric");
        }

        async function getData(cityName,country,units){
            const weatherKey = "c61e36e895bb91ce2746c1c42d97aa6f";
            const response = await fetch(`http://api.openweathermap.org/data/2.5/find?q=${cityName},${country}&units=${units}&appid=${weatherKey}`,{mode:"cors"});
            
            if(response.status !== 200) return Error("Ooops, something went wrong, try again")
            
            const weatherData = await response.json();

            if (weatherData.count === 0) return Error("There is no such city in that countr :p");

            console.table(weatherData.list[0].main)
            return weatherData;
        }
    })();
    
