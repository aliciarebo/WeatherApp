const api = {
  key: 'b401a40bf7d17ce2170ab0ba9a2af48a',
  url: `https://api.openweathermap.org/data/2.5/weather?`,
};

const resultElement = document.getElementById('result');

async function search(query) {
  try {
    const response = await fetch(
      `${api.url}q=${query}&appid=${api.key}&lang=es`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    showWeather(data);
  } catch (error) {
    console.log(error);
    swal('Sorry...', error.message || 'An error ocurred');
  }
}

function showWeather(data) {
  const weatherBox = document.createElement('div');
  weatherBox.setAttribute('id', 'weather');
  weatherBox.setAttribute('class', 'weather-result');

  const cityElement = document.createElement('h3');
  const weatherImgElement = document.createElement('img');
  const temperatureElement = document.createElement('p');
  temperatureElement.setAttribute('class', 'grado');
  const dateElement = document.createElement('p');
  const humidityElement = document.createElement('p');

  const { name, main, weather } = data;
  const { temp, humidity } = main;

  cityElement.appendChild(document.createTextNode(name));

  temperatureElement.appendChild(
    document.createTextNode(`${KelvinToCelsius(temp)} °C`)
  );

  weatherImgElement.src = imgWeather(weather[0].main);

  dateElement.appendChild(
    document.createTextNode(
      new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long' })
    )
  );

  humidityElement.appendChild(document.createTextNode(`Humedad: ${humidity}`));

  weatherBox.replaceChildren(
    cityElement,
    weatherImgElement,
    temperatureElement,
    dateElement,
    humidityElement
  );

  resultElement.replaceChildren(weatherBox);
}

function imgWeather(weather) {
  const weatherStatus = {
    Rain: '/img/rain.png',
    Clouds: '/img/cloud.png',
    Clear: '/img/sun.png',
    Other: '/img/cloudy.png',
  };

  return weatherStatus[weather] || weatherStatus.Other;
}

function KelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}
