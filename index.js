const apiKey = 'AIzaSyASi2c2w2ujewB4o4LjXS64n1-KmW7Llsk';

// Lấy tham chiếu đến ô input và thẻ <h1>
const searchInput = document.getElementById('searchInput');
const resultElement = document.getElementById('result');

// Hàm tìm kiếm địa điểm
function searchPlace() {
  const placeName = searchInput.value;
  
  // Gọi API để tìm kiếm địa điểm với placeName và apiKey
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}`)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        // Lấy thông tin địa điểm đầu tiên trong kết quả tìm kiếm
        const place = data.results[0];
        
        // Lấy tên địa điểm
        const cityName = place.formatted_address;
        
        // In ra tên địa điểm
        resultElement.textContent = cityName;
      } else {
        resultElement.textContent = 'Không tìm thấy địa điểm';
      }
    })
    .catch(error => {
      console.log('Đã xảy ra lỗi:', error);
      resultElement.textContent = 'Đã xảy ra lỗi';
    });
}