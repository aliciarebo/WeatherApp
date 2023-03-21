const api = {
  key: "b401a40bf7d17ce2170ab0ba9a2af48a",
  url: `https://api.openweathermap.org/data/2.5/weather?`,
};

const weatherBox = document.getElementById('details');
const city = document.getElementById("city");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const tempImg = document.getElementById("img-temp");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");

async function search(query) {
  try {
    const response = await fetch(
      `${api.url}q=${query}&appid=${api.key}&lang=es`
    );
    const data = await response.json();
    createField(data);
    imgWeather(data);

  } catch (error) {
    swal('Sorry...', '...but you still have to find what you are looking for');
    weatherBox.classList.remove('weather-details');
  }
}
function clearFields() {
  city.textContent = "";
  temp.textContent = "";
  date.textContent = "";
  description.textContent = "";
  humidity.textContent = "";
  tempImg.src = "";
}
function createField(data) {
  clearFields();
  city.appendChild(document.createTextNode(data.name));
  temp.appendChild(document.createTextNode(temperature(data.main.temp) + '°C'));
  date.appendChild(document.createTextNode(formatedDate(new Date())));
  description.appendChild(document.createTextNode(data.weather[0].description));
  humidity.appendChild(document.createTextNode('Humedad: ' + data.main.humidity));
}

function imgWeather(data) {
  const weather = data.weather[0].main;
  if (weather == 'Rain') {
    tempImg.src = '/img/rain.png'
  } else if (weather == 'Clouds') {
    tempImg.src = '/img/cloud.png'
  } else if (weather == 'Clear') {
    tempImg.src = '/img/sun.png'
  } else {
    tempImg.src = '/img/cloudy.png'
  }


}

function formatedDate(date) {
  const options = { day: "numeric", month: "long" }; // opciones de formato para la fecha
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}

function temperature(kelvin) {
  return Math.round(kelvin - 273.15);
}

function onSubmit(e) {
  e.preventDefault();
  const searchValue = searchfield.value.trim();
  if (searchValue) {
    weatherBox.classList.add('weather-details');
    search(searchValue);
    searchfield.value = '';
  } else {
    swal('Sorry', 'what city are you looking for?');
  }
}

const searchform = document.getElementById("f-search");
const searchfield = document.getElementById("search");

searchform.addEventListener("submit", onSubmit, true);
