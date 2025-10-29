const weatherForm=document.querySelector(".weatherform");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apikey="1f80bc3b7ad783a23566aabb5fea8bf5"

weatherForm.addEventListener("submit", async event=>{
    event.preventDefault();
    const city=cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);

            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.log(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter the city")
    }

});
async function getWeatherData(city){
    const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response=await fetch(apiURL);
    
    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }
    return await response.json();
}
function displayWeatherInfo(data){
    const {name: city, 
           main:{temp, humidity},
           weather:[{description, id}]} = data;

           card.textContent="";
           card.style.display="flex";
           const cityDisplay=document.createElement("h1");
           const tempDisplay=document.createElement("strong");
           const humidityDisplay=document.createElement("p");
           const descDisplay=document.createElement("p");
           const WeatherEmoji=document.createElement("p");
           
           cityDisplay.textContent=city;
           tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
           humidityDisplay.textContent=`Humidity: ${humidity}%`;
           descDisplay.textContent=description;
           WeatherEmoji.textContent=getWeatherEmoji(id);

           cityDisplay.classList.add("h1");
           tempDisplay.classList.add("strong");
           humidityDisplay.classList.add("humidity");
           descDisplay.classList.add("description");
           WeatherEmoji.classList.add("weatherEmoji");

           card.appendChild(cityDisplay);
           card.appendChild(tempDisplay);
           card.appendChild(humidityDisplay);
           card.appendChild(descDisplay);
           card.appendChild(WeatherEmoji);
}
function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";
    }
}
function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("error");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}