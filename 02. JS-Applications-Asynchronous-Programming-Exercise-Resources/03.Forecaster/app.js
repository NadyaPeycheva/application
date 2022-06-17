function attachEvents() {
    document.getElementById('submit').addEventListener('click',getDestination);
}

attachEvents();

async function getDestination() {
    let symbols={
        "Sunny":"&#x2600",
        "Partly sunny":"&#x26C5",
        "Overcast":"&#x2601",
        "Rain":"&#x2614",
        "Degrees":"&#176"

    }
    let inputLocation=document.getElementById('location').value;

    let urlForAllLocations=`http://localhost:3030/jsonstore/forecaster/locations/`;
    let response= await fetch(urlForAllLocations);
    let allLocations=await response.json();

    let [currentLocation]=allLocations.filter(location=>location.name===inputLocation);

    let currentURLOfLokation=`http://localhost:3030/jsonstore/forecaster/today/${currentLocation.code}`;
    let responseOfLokation=await fetch(currentURLOfLokation);
    let dateOfCurrentLocation= await responseOfLokation.json();

    let urlForThreeDays=`http://localhost:3030/jsonstore/forecaster/upcoming/${currentLocation.code}`;
    let responseForThreeDays=await fetch(urlForThreeDays);
    let dateOfThreDays=await responseForThreeDays.json();

    document.getElementById('forecast').style="display:block";

    let currentForecast=dateOfCurrentLocation.forecast;
    let createdDiv=document.createElement('div');
    createdDiv.classList.add('forecasts');
    createdDiv.innerHTML=`<span class="condition symbol">${symbols[currentForecast.condition]}</span>
    <span class="condition">
    <span class="forecast-data">${dateOfCurrentLocation.name}</span>
    <span class="forecast-data">${currentForecast.low}/${currentForecast.high}</span>
    <span class="forecast-data">${currentForecast.condition}</span>
    </span>`;
    document.getElementById('current').appendChild(createdDiv);

    let uncomingDiv=document.createElement('div');
    uncomingDiv.classList.add("forecast-info");

    let forecastForThreeDays=dateOfThreDays.forecast;
    console.log(forecastForThreeDays);
    forecastForThreeDays.forEach(f=>{
        let spanElement=document.createElement('span');
        spanElement.classList.add("upcoming");
        spanElement.innerHTML=`<span class="symbol">${symbols[f.condition]}</span>
        <span class="forecast-data">${f.low}/${f.high}</span>
        <span class="forecast-data">${f.condition}</span>`;
        uncomingDiv.appendChild(spanElement);
    });
    document.getElementById('upcoming').appendChild(uncomingDiv);

}