const search = document.querySelector('.btnsearch');
const image = document.querySelector('.image_weather');
const temperature = document.querySelector('.tem_number');
const result = document.querySelector('#result');
const tempFeel = document.querySelector('.tem_feel');
const tempMax = document.querySelector('.tem_max');
const tempMin = document.querySelector('.tem_min');
search.addEventListener('click', () => {
    const APIKey = 'd3e085e20c39e18040fc69688298a017';
    const city = document.querySelector('.searchInput').value;
    
    if (city === '') 
    {
        return;
    }
        
    

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(
        json => {
            if (json.cod === '404') {
                result.textContent = 'Không tìm thấy địa điểm';
                image.src = 'image/error.png';
                temperature.innerHTML = '';
                tempFeel.innerHTML = '';
                tempMax.innerHTML = '';
                tempMin.innerHTML = '';
              } 
              else {
                
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
                    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                    temperature.style.color = 'rgb(248, 21, 21)';
                }
                else if (parseInt(json.main.temp) >= 30 && parseInt(json.main.temp) < 40) {
                    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                    temperature.style.color = 'rgb(248, 104, 21)';
                  } 
                else if(20 <= parseInt(json.main.temp) && parseInt(json.main.temp) < 30)
                {
                    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                    temperature.style.color = 'rgb(36, 160, 202)';
                }
                else{
                    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                    temperature.style.color = 'rgb(106, 162, 198)';
                }
              
                tempFeel.innerHTML = `<span>Nhiệt độ cảm nhận: </span>${parseInt(json.main.feels_like)}<span>°C</span>`;
                result.textContent = city;
                tempMax.innerHTML = `<span>Nhiệt độ cao nhất: </span>${parseInt(json.main.temp_max)}<span>°C</span>`;
                tempMin.innerHTML = `<span>Nhiệt độ thấp nhất: </span>${parseInt(json.main.temp_min)}<span>°C</span>`;
              }
    }
    );
});

function getCurrentTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString(); // Lấy giờ hiện tại

  const currentTimeElement = document.querySelector('.time');
  currentTimeElement.textContent = 'Time: ' + currentTime;
}

// Cập nhật giờ mỗi giây
setInterval(getCurrentTime, 1000);
