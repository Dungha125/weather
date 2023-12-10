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
const infor = document.querySelector('.info');
let myChart;
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
              infor.style.display = 'none';
                weatherTodayDiv.style.borderRadius = '10px';            
            } else {
      
                weatherWeekDiv.style.display = 'flex';
                infor.style.display = 'flex';
                weatherTodayDiv.style.borderRadius = '10px';
                weatherTodayDiv.style.width = '30%';
                if(window.innerWidth < 768)
                {
                  weatherTodayDiv.style.width = '100%';
                  weatherWeekDiv.style.width = '100%';
                }
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
                tempFeel.innerHTML = `<span>Nhiệt độ cảm nhận </span>${parseInt(json.main.feels_like)}<span>°C</span>`;
                result.textContent = city;
                tempMax.innerHTML = `<span>Nhiệt độ cao nhất </span>${parseInt(json.main.temp_max)}<span>°C</span>`;
                tempMin.innerHTML = `<span>Nhiệt độ thấp nhất </span>${parseInt(json.main.temp_min)}<span>°C</span>`;
                searchImages(query, APIplace);
                displayImage(imageUrl); 
                chartweather(city,APIKey);
            }
        });
        let imageUrl;
        function searchImages(query, APIplace) {
            const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${APIplace}`;
        
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.results.length > 0) {
                        imageUrl = data.results[0].urls.regular; // Thay đổi tên biến imageUrl thành imageUrlResult
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
function chartweather(city, APIKey) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => {
      // Gọi hàm tạo biểu đồ với dữ liệu từ API
      createOrUpdateChart(data);
    })
    .catch(error => {
      console.error('Lỗi khi gọi API:', error);
    });
}
// Hàm để tạo biểu đồ
function createOrUpdateChart(data) {
  const labels = data.list.map(item => item.dt_txt) 
    .map(time => time.split(' ')[1]); 

  const temps = data.list.map(item => item.main.temp);
  const maxColumns = 7; 

  // Giới hạn số cột và giá trị của trục x
  const limitedLabels = labels.slice(0, maxColumns);
  const limitedTemps = temps.slice(0, maxColumns);

  if (!myChart) {
    // Nếu biểu đồ chưa tồn tại, tạo mới biểu đồ
    const ctx = document.getElementById('temperatureChart').getContext('2d');
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: limitedLabels,
        datasets: [{
          label: 'Nhiệt độ (°C)',
          data: limitedTemps,
          backgroundColor: 'rgba(68, 145, 234, 0.525)',
          borderColor: 'rgba(68, 145, 234, 1)',
          borderWidth: 1.2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        maintainAspectRatio: false, 
        responsive: true, 
        plugins: {
            legend: {
                position: 'top'
            }
        }
      }
    });
  } else {
    myChart.data.labels = limitedLabels;
    myChart.data.datasets[0].data = limitedTemps;
    myChart.update();
  }
}
});
function getCurrentTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    const currentTimeElement = document.querySelector('.time');
    currentTimeElement.textContent = 'Time: ' + currentTime;
}
setInterval(getCurrentTime, 1000);

