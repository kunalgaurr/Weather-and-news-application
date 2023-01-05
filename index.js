// FETCHING THE DATE WEB API
const date = new Date();

// GETTING HOURS
document.getElementById('hour').innerHTML = date.getHours();

if (date.getHours() < 10) {
  document.getElementById('hour').innerHTML = '0' + date.getHours();
}

if (date.getHours() > 12) {
  document.getElementById('hour').innerHTML =
    document.getElementById('hour').innerHTML - 12;
  document.getElementById('half').innerHTML = 'PM';
} else {
  document.getElementById('half').innerHTML = 'AM';
}

// GETTING MINUTES
document.getElementById('minute').innerHTML = date.getMinutes();

if (date.getMinutes() < 10) {
  document.getElementById('minute').innerHTML = '0' + date.getMinutes();
}

// GETTING SECONDS
document.getElementById('second').innerHTML = date.getSeconds();

if (date.getSeconds() < 10) {
  document.getElementById('second').innerHTML = '0' + date.getSeconds();
}

// GETTING DATE
document.getElementById('date').innerHTML = date.getDate();

if (date.getDate() < 10) {
  document.getElementById('date').innerHTML = '0' + date.getDate();
}

// GETTING MONTH
const month = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

document.getElementById('month').innerHTML = month[date.getMonth()];

// GETTING YEAR
document.getElementById('year').innerHTML = date.getFullYear();

// GETTING WEEKDAY
const weekday = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thusrday',
  'Friday',
  'Saturday',
  'Sunday',
];

document.getElementById('day').innerHTML = weekday[date.getDay() - 1];

// FETCHING THE GEOLOCATION WEB API
if (window.navigator.geolocation) {
  // GET THE USER LATITUDE AND LONGITUDE
  navigator.geolocation.getCurrentPosition(console.log, console.log);
  //
  const successfulLookUp = (position) => {
    const { latitude, longitude } = position.coords;

    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=74397bd30b26457d82acbb673f59c097`
    )
      .then((response) => response.json())
      .then((response) => {
        const city = response.results[0].components.city;
        const state = response.results[0].components.state;

        document.getElementById('city').innerHTML = city;
        document.getElementById('state').innerHTML = state;

        // FETCHING DATA FROM THE WEATHER API
        let userLocation = city || state;

        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key':
              'e0f2b7102amshaa1596575ea8f03p17ea7fjsnf3f5f9109382',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com',
          },
        };

        fetch(
          'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' +
            userLocation,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            console.log(response);

            temp.innerHTML = response.temp;
            feels_like.innerHTML = response.feels_like;
            humidity.innerHTML = response.humidity;
            min_temp.innerHTML = response.min_temp;
            max_temp.innerHTML = response.max_temp;
            wind_speed.innerHTML = response.wind_speed;
            wind_degrees.innerHTML = response.wind_degrees;
            sunrise.innerHTML = response.sunrise;
            sunset.innerHTML = response.sunset;

            const date = new Date();

            if (date.getHours() >= 6 && date.getHours <= 18) {
              document.getElementById('sunmoon').innerHTML = '☀️';
            } else {
              document.getElementById('sunmoon').innerHTML = '🌙';
            }

            console.log(response.sunset);
          })

          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  navigator.geolocation.getCurrentPosition(successfulLookUp, console.log);
} else {
  alert(
    'Your browser does not support geolocation, please consider changing browser'
  );
}