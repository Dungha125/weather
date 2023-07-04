const search = document.querySelector('.btnsearch');

search.addEventListener('click', () => {
    const APIKey = 'd3e085e20c39e18040fc69688298a017';
    const city = document.querySelector('.searchInput').value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json().then(
        json => {
            if (json.cod === '404') {
                result.textContent = 'Không tìm thấy địa điểm';
                image.src = '';
                tempurature.innerHTML = '';
            } else {
                const image = document.querySelector('.image_weather');
                const tempurature = document.querySelector('.tem_number');
                const result = document.querySelector('#result');
                switch (json.weather[0].main) {
                    case 'Sun':
                        image.src = 'image/sun.png';
                        break;
                    case 'Clear':
                        image.src = 'image/sun.png';
                        break;
                    case 'Rain':
                        image.src = 'image/rain.png';
                        break;
                    case 'Clouds':
                        image.src = 'image/cloud.png';
                        break;
                    case 'Snow':
                        image.src = 'image/snow.png';
                        break;
                    default:
                        image.src = '';
                }

                tempurature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                result.textContent = city;
            }
        }
    ));
});
