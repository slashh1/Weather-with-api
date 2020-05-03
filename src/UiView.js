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

const insertView = (weData) => {
  const innerelem = `<div class="col-lg-4 col-md-4 p-2 m-1 d-flex justify-content-center">
    <div class="card m-1 justify-content-center" style="width: 18rem;">
      <img
        src=https://www.metaweather.com/static/img/weather/${weData.weather_state_abbr}.svg"
        class="card-img-top img-svg"
        alt="..."
        height="200px"
        width="200px"
      />
      <div class="card-body">
        <h5 class="card-title">Today <span class="today-date"></span></h5>
        <p class="card-text">
          Date: ${weData.applicable_date} <br />
          Min: ${weData.min_temp} <br />
          Max: ${weData.max_temp} <br />
          Wind Speed: ${weData.wind_speed} <br />
          Wind Direction: ${weData.wind_direction_compass} <br />
        </p>
      </div>
    </div>
  </div>`;
  document.querySelector(".row").insertAdjacentHTML("beforeend", innerelem);
};
