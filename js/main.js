fetch('city_coordinates.csv') // Replace 'yourfile.csv' with the actual filename
      .then(response => response.text())
      .then(csvData => {
        parseCSV(csvData);
      })
      .catch(error => console.error('Error loading CSV file:', error));

    function parseCSV(csvData) {
      // Assuming PapaParse is included in your project
      Papa.parse(csvData, {
        complete: function(results) {
          // The results.data contains the array of arrays representing CSV data
          const input = document.getElementById("city");
          results.data.forEach(city => {
            const option = document.createElement("option");
            option.value = `lon=${city.longitude}&lat=${city.latitude}`;
            option.innerHTML = city.city
            input.appendChild(option)
          })
        },
        header: true, // Set to true if your CSV has headers
      });
    }



const fetchWeather = async () => {
  const container = document.getElementById("weather-container");
  container.innerHTML = "";
  const value = document.getElementById("city").value;
  const response = await fetch(
    `http://www.7timer.info/bin/api.pl?${value}&product=civillight&output=json`
  );
  const weatherData = await response.json();
  weatherData.dataseries.forEach(weatherDay => {
    const day = document.createElement("div");
    day.classList.add("card")
    day.classList.add("col")
    day.style.width = "18"
    const dateString = weatherDay.date.toString();
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const dday = dateString.substring(6, 8);

    const dateObject = new Date(`${year}-${month}-${dday}`);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };

    const formattedDate = dateObject.toLocaleDateString('en-US', options);

    day.innerHTML = `
    <img class="card-img-top" src="images/${weatherDay.weather}.png" />
    <div class="card-body">
      <h5 class="card-title">${formattedDate}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">High: ${weatherDay.temp2m.max} °C</li>
      <li class="list-group-item">Low: ${weatherDay.temp2m.min} °C</li>
    </ul>
    `
    container.appendChild(day);
  });
}

