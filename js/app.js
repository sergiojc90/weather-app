    (function searchCity() {
        const btn = document.getElementById("search-btn");
        const cityName = document.getElementById("cityName");
        const country = document.getElementById("countries");

        btn.addEventListener("click",(e) => {
            if(cityName.value === "" || country.value === "") return console.log("Choose a city and a country");

            const data = getData(cityName.value, country.value,"metric");

            
        });

        async function getData(cityName,country,units){
            const weatherKey = "c61e36e895bb91ce2746c1c42d97aa6f";
            const response = await fetch(`http://api.openweathermap.org/data/2.5/find?q=${cityName},${country}&units=${units}&appid=${weatherKey}`,{mode:"cors"});
            
            if(response.status !== 200) return console.log("Ooops, something went wrong, try again")
            
            const weatherData = await response.json();

            if (weatherData.count === 0) return console.log("Nothing to do here");
            return weatherData;
        }
    })();
    
