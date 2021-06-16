    (function searchCity() {
        const btn = document.getElementById("search-btn");
        const cityName = document.getElementById("cityName");
        const country = document.getElementById("countries");

        btn.addEventListener("click",(e) => {
            e.preventDefault;
            console.log(getData(cityName.value, country.value,"metric")); 
        });

        async function getData(cityName,country,units){
            const weatherKey = "c61e36e895bb91ce2746c1c42d97aa6f";
            const weatherData = await fetch(`http://api.openweathermap.org/data/2.5/find?q=${cityName},${country}&units=${units}&appid=${weatherKey}`,{mode:"cors"});
            
            return weatherData.json();
        }
    })();
    
