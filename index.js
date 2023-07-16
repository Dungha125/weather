const search = document.querySelector('.btnsearch');
const image = document.querySelector('.image_weather');
const temperature = document.querySelector('.tem_number');
const result = document.querySelector('#result');
const tempFeel = document.querySelector('.tem_feel');
const tempMax = document.querySelector('.tem_max');
const tempMin = document.querySelector('.tem_min');
const imgElement = document.querySelector('.image_place');
const APIplace = 'uILXSVWL2QNWNFTIJQhISufyRB3BZ87Wkujhq3aV-3k';
const weatherWeekDiv = document.querySelector('.weather_week');
const weatherTodayDiv = document.querySelector('.weather_today');

 // Thay 'YOUR_UNSPLASH_ACCESS_KEY' bằng khóa truy cập API Unsplash của bạn
search.addEventListener('click', () => {
    const APIKey = 'd3e085e20c39e18040fc69688298a017';
    const city = document.querySelector('.searchInput').value;
    const query = document.querySelector('.searchInput').value;
    
    if (city === '') {
        return;
    }

    //hiển thị nhiệt độ
    const getTemday = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                imgElement.style.display = 'none';
                result.textContent = 'Không tìm thấy địa điểm';
                image.src = 'image/error.png';
                temperature.innerHTML = '';
                tempFeel.innerHTML = '';
                tempMax.innerHTML = '';
                tempMin.innerHTML = '';
                weatherWeekDiv.style.display = 'none';
                weatherTodayDiv.style.borderRadius = '10px';
            } else {
                weatherWeekDiv.style.display = 'flex';
                weatherTodayDiv.style.borderRadius = '10px 10px 0 0';
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

                if (parseInt(json.main.temp) >= 40) {
                    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                    temperature.style.color = 'rgb(248, 21, 21)';
                } else if (parseInt(json.main.temp) >= 30 && parseInt(json.main.temp) < 40) {
                    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                    temperature.style.color = 'rgb(248, 104, 21)';
                } else if (20 <= parseInt(json.main.temp) && parseInt(json.main.temp) < 30) {
                    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                    temperature.style.color = 'rgb(36, 160, 202)';
                } else {
                    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                    temperature.style.color = 'rgb(106, 162, 198)';
                }

                tempFeel.innerHTML = `<span>Nhiệt độ cảm nhận: </span>${parseInt(json.main.feels_like)}<span>°C</span>`;
                result.textContent = city;
                tempMax.innerHTML = `<span>Nhiệt độ cao nhất: </span>${parseInt(json.main.temp_max)}<span>°C</span>`;
                tempMin.innerHTML = `<span>Nhiệt độ thấp nhất: </span>${parseInt(json.main.temp_min)}<span>°C</span>`;
                searchImages(query, APIplace);
                displayImage(imageUrl);
            }
        });
function searchImages(query, APIplace) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${APIplace}`;
    //tìm ảnh 
  fetch(url)
      .then(response => response.json())
      .then(data => {
          if (data.results.length > 0) {
              const imageUrl = data.results[0].urls.regular;
              displayImage(imageUrl);
          } else {
              console.log('Không tìm thấy hình ảnh cho địa điểm này.');
          }
      })
      .catch(error => {
          console.log('Đã xảy ra lỗi:', error);
      });
}

// Hiển thị hình ảnh trong một thẻ <img> với thuộc tính src
function displayImage(imageUrl) {

  imgElement.src = imageUrl;
  imgElement.style.display = 'block';
}

//cap nhap theo gio



});

function getCurrentTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString(); // Lấy giờ hiện tại

    const currentTimeElement = document.querySelector('.time');
    currentTimeElement.textContent = 'Time: ' + currentTime;
}

// Cập nhật giờ mỗi giây
setInterval(getCurrentTime, 1000);
