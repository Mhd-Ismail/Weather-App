
// Search input function
var searchInput = document.getElementById("findCityInput");
searchInput.addEventListener("keyup", setCity);
function setCity() {
    getWeatherData(searchInput.value);
}


let key = "5f00d1aa043148508cc235737212209",
    baseURL = "http://api.weatherapi.com/v1",
    foreCast = "/forecast.json?",
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    d = new Date(),
    foreCast1 = {},
    foreCast2 = {},
    foreCast3 = {};



getWeatherData("goch")
// function to get the api data
async function getWeatherData(city = "goch") {
    let apiResponse = await fetch(`${baseURL}${foreCast}key=${key}&q=${city}&days=3`);
    let data = await apiResponse.json();
    foreCast1 = {
        date: getDateName(data.forecast.forecastday[0].date),
        location: data.location.name,
        degree: data.current.temp_c,
        icon: data.current.condition.icon,
        text: data.current.condition.text,
        winDir: data.current.wind_dir,
        humidity: data.current.humidity,
        windKph: data.current.wind_kph,
    };
    foreCast2 = {
        date: getDateName(data.forecast.forecastday[1].date),
        icon: data.forecast.forecastday[1].day.condition.icon,
        maxDegree: data.forecast.forecastday[1].day.maxtemp_c,
        minDegree: data.forecast.forecastday[1].day.mintemp_c,
        text: data.forecast.forecastday[1].day.condition.text,
    };
    foreCast3 = {
        date: getDateName(data.forecast.forecastday[2].date),
        icon: data.forecast.forecastday[2].day.condition.icon,
        maxDegree: data.forecast.forecastday[2].day.maxtemp_c,
        minDegree: data.forecast.forecastday[2].day.mintemp_c,
        text: data.forecast.forecastday[2].day.condition.text,
    };
    console.log(data);
    displayData1();
    displayData2();
    displayData3();
}
// functions to display the foreCast data
function displayData1() {
    let forecast1Container = document.getElementById("today");
    forecast1Container.innerHTML = `
     <div class="forecastHeader py-2 d-flex justify-content-between ">
                            <span>${foreCast1.date}</span>
                            <span>${d.getDate()} ${months[d.getMonth()]}</span>
                        </div>
                        <div class="px-3 pt-3">
                            <p>${foreCast1.location}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="font90">${foreCast1.degree}</span>
                                <span><img src="${foreCast1.icon}" alt=""></span>
                            </div>
                            <p class="blue">${foreCast1.text}</p>
                        </div>
                        <div class="forecastIcons p-3">
                            <img src="images/icon-umberella.png" alt="">
                            <span>${foreCast1.humidity}%</span>
                            <img src="images/icon-wind.png" alt="">
                            <span>${foreCast1.windKph}km/h</span>
                            <img src="images/icon-compass.png" alt="">
                            <span>${foreCast1.winDir}</span>
                        </div>
    `;
}
function displayData2() {
    let foreCast2Container = document.getElementById("secondDay");
    foreCast2Container.innerHTML =
        `
        <div class="forecastHeader2 py-2 text-center">
                            <span>${foreCast2.date}</span>
                        </div>
                        <div class="text-center pt-5 secondForecastText">
                            <img class="forecastImg" src="${foreCast2.icon}" alt="" />
                            <p class="firstP">${foreCast2.maxDegree}C</p>
                            <p class="secP">${foreCast2.minDegree}°</p>
                            <p class="blue">${foreCast2.text}</p>
                        </div>
    `;
}
function displayData3() {
    foreCast3Container =
        `
        <div class="forecastHeader2 py-2 text-center">
                            <span>${foreCast3.date}</span>
                        </div>
                        <div class="text-center pt-5 secondForecastText">
                            <img class="forecastImg" src="${foreCast3.icon}" alt="" />
                            <p class="firstP">${foreCast3.maxDegree}C</p>
                            <p class="secP">${foreCast3.minDegree}°</p>
                            <p class="blue">${foreCast3.text}</p>
                        </div>
    `;
    document.getElementById("thirdDay").innerHTML = foreCast3Container;
}
// date
function getDateName(dateNumbers) {
    let d = new Date(dateNumbers);
    x = d.getDay();
    let dayName = "";
    switch (x) {
        case (0):
            dayName = "Sunday";
            break;
        case (1):
            dayName = "Monday";
            break;
        case (2):
            dayName = "Tuesday";
            break;
        case (3):
            dayName = "Wednesday";
            break;
        case (4):
            dayName = "Thursday";
            break;
        case (5):
            dayName = "Friday";
            break;
        case (6):
            dayName = "Saturday";
            break;
        default:
            break;
    }
    console.log(dayName);
    return dayName;
}

