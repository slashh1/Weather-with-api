//window.addEventListener("load", geo);
const axios = require("axios");

let corsProxy = "https://cors-anywhere.herokuapp.com";
let x, y;

//button on click
document.querySelector(".sub").addEventListener("click", geo);
//navigator module init
function geo() {
  document.querySelector(".active").innerHTML = "";
  renderLoader();
  navigator.geolocation.getCurrentPosition(sucessFunc, errorFunction);
}
//geolocation.getcurrentposition success Function
function sucessFunc(position) {
  x = position.coords.latitude;
  y = position.coords.longitude;
  console.log(x, y);
  getLocationData(x, y);
}
//geolocation.getcurrentposition failure Function
function errorFunction() {
  alert("Please Allow to share location");
}
//fetching woeid from metaweather api
const getLocationData = async (lat, lon) => {
  //https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/
  const response = await axios.get(
    `${corsProxy}/https://www.metaweather.com/api/location/search/?lattlong=${lat},${lon}`
  );
  let displayData, d1, d2, d3, d4, d5, d6;
  [displayData, d1, d2, d3, d4, d5, ...d6] = response.data;
  console.log(displayData);
  getWeather(displayData["woeid"]);
};

const getWeather = async (woeid) => {
  //https://www.metaweather.com/api/location/2487956/
  const response = await axios(
    `${corsProxy}/https://www.metaweather.com/api/location/${woeid}/`
  );
  console.log(response.data.consolidated_weather);
  const result = response.data;
  let weather = new Object();
  weather.today = await result.consolidated_weather[0];
  weather.tommorow = await result.consolidated_weather[1];
  weather.dayAfter = await result.consolidated_weather[2];
  weather.conLocType = await result.parent.location_type;
  weather.country = await result.parent.title;
  weather.latLon = await result.parent.latt_long;
  weather.cityLocType = await result.location_type;
  weather.city = await result.title;
  weather.timeZone = await result.timezone;
  //From weather need:
  // 1.	weather_state_abbr
  // 2.	applicable_date
  // 3.	max_temp
  // 4.	min_temp
  // 5.	wind_speed
  // 6.	wind_direction_compass
  // parent.location_type
  // parent.title
  // parent.latt_long
  // location_type
  // title
  // timezone

  console.log(
    "1 \n",
    weather.today,
    "\n 2",
    weather.tommorow,
    "\n 3",
    weather.dayAfter
  );
  insertView([
    weather.conLocType,
    weather.country,
    weather.latLon,
    weather.cityLocType,
    weather.city,
    weather.timeZone,
  ]);
  insertView(weather.today);
  insertView(weather.tommorow);
};

//UI

//From weather need:
// 1.	weather_state_abbr
// 2.	weData.applicable_date
// 3.	weData.max_temp
// 4.	weData.min_temp
// 5.	weData.wind_speed
// 6.	weData.wind_direction_compass
//   weather.conLocType
// weather.country
// weather.latLon
// weather.cityLocType
// weather.city
// weather.timeZone

export const insertView = (weData) => {
  clearLoader();
  let today = new Date();
  let dat = today.getDate();
  dat > 10 ? (dat = dat) : (dat = "0" + dat);
  console.log("date" + dat);
  let mon = today.getMonth() + 1;
  mon > 10 ? (mon = mon) : (mon = "0" + mon);
  console.log("month" + mon);
  let year = today.getFullYear();
  let actualDate = `${year}-${mon}-${dat}`;
  let d = new Date(actualDate);

  d.setDate(d.getDate() + 1);
  let tomDate = `${d.getFullYear()}-${
    d.getMonth() > 10 ? d.getMonth() : "0" + (d.getMonth() + 1)
  }-${d.getDate() > 10 ? d.getDate() : "0" + d.getDate()}`;
  let s = "";
  console.log(actualDate, tomDate);
  if (!Array.isArray(weData)) {
    console.log(weData.applicable_date, actualDate);
    if (weData.applicable_date == actualDate) {
      s = "Today";
    } else if (weData.applicable_date == tomDate) {
      s = "Tommorow";
    }
    const innerelem = `<div class="col-lg-4 col-md-4 p-2 m-1 d-flex justify-content-center">
    <div class="card m-1 justify-content-center" style="width: 18rem;">
      <img
        src="https://www.metaweather.com/static/img/weather/${
          weData.weather_state_abbr
        }.svg"
        class="card-img-top img-svg"
        alt="..."
        height="200px"
        width="200px"
      />
      <div class="card-body">
        <h5 class="card-title">${s} <span class="today-date"></span></h5>
        <p class="card-text">
          Date: ${weData.applicable_date} <br />
          Min: ${parseFloat(weData.min_temp).toFixed(2)}&deg;C <br />
          Max: ${parseFloat(weData.max_temp).toFixed(2)}&deg;C <br />
          Wind Speed: ${weData.wind_speed} <br />
          Wind Direction: ${weData.wind_direction_compass} <br />
        </p>
      </div>
    </div>
  </div>`;
    //parseFloat(yourString).toFixed(2)
    document.querySelector(".load").insertAdjacentHTML("beforeend", innerelem);
  } else {
    console.log(weData);
    const innerelem = `<div class="col-lg-3 col-md-3 p-2 m-1 d-flex align-content-center justify-content-center">
    <div class="card m-1" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${weData[3]} : ${weData[4]}</h5>
        <p class="card-text">
          ${weData[0]}: ${weData[1]}
          <br />
          TimeZone: ${weData[5]}
          <br />
          Lattitude:
          ${weData[2].split(",")[0]}
          <br />
          Longitude:
          ${weData[2].split(",")[1]}
        </p>
      </div>
    </div>
    <!--<div class="buttons align-items-center d-flex justify-content-center">
      <p>put a butto here</p>
    </div>-->
  </div>`;
    document.querySelector(".load").insertAdjacentHTML("beforeend", innerelem);
  }
};
//   weather.conLocType
// weather.country
// weather.latLon
// weather.cityLocType
// weather.city
// weather.timeZone

function renderLoader() {
  const loaderHtml = `<div class="loader">
  <img src="http://www.jasonkenison.com/uploads/blog/loading.png" alt="loading.png">
  </div>`;
  document.querySelector(".load").insertAdjacentHTML("beforeend", loaderHtml);
}

function clearLoader() {
  document.querySelector(".loader").innerHTML = "";
}
