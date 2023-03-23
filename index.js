const weatherForm = document.getElementById('weather-form');

weatherForm.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(weatherForm);
  const city = formData.get('city').trim();

  if (city) {
    await search(city);
  } else {
    swal('Sorry', 'What city are you looking for?');
  }

  weatherForm.reset();
}
