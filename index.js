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
                tempfeel.innerHTML = '';
                temmin.innerHTML = '';
                temmax.innerHTML = '';
                details.style.display = 'none';
            } else {
                const image = document.querySelector('.image_weather');
                const tempurature = document.querySelector('.tem_number');
                const result = document.querySelector('#result');
                const tempfeel = document.querySelector('.tem_feel');
                const temmax = document.querySelector('.tem_max');
                const temmin = document.querySelector('.tem_min');
                const details = document.querySelector('.details');
                switch (json.weather[0].main) {
                    case 'Sun':
                        image.src = 'image/sun.png';
                        break;
                    case 'Clear':
                        image.src = 'image/clear.png';
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
                if(parseInt(json.main.temp) >= 40)
                {
                    tempurature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                    tempurature.style.color = 'rgb(248, 21, 21)';
                }
                else if (parseInt(json.main.temp) >= 30 || parseInt(json.main.temp) < 40) {
                    tempurature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                    tempurature.style.color = 'rgb(248, 104, 21)';
                  } 
                else if(20 <= parseInt(json.main.temp) || parseInt(json.main.temp) < 30)
                {
                    tempurature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                    tempurature.style.color = 'rgb(35, 104, 188)';
                }
                else{
                    tempurature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                    tempurature.style.color = 'rgb(106, 162, 198)';
                  }
                tempfeel.innerHTML = `<span>Nhiệt độ cảm nhận: </span>${parseInt(json.main.feels_like)}<span>°C</span>`;
                /*tempurature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;*/
                result.textContent = city;
                temmax.innerHTML = `<span>Nhiệt độ cao nhất: </span>${parseInt(json.main.temp_max)}<span>°C</span>`;
                temmin.innerHTML = `<span>Nhiệt độ thấp nhất: </span>${parseInt(json.main.temp_min)}<span>°C</span>`;

            }
        }
    ));
});
