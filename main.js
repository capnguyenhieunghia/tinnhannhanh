function updateDateTime() {
    const dateDisplay = document.getElementById('date-display');
    const timeDisplay = document.getElementById('time-display');
    const currentDate = new Date();
  
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
  
    dateDisplay.textContent = currentDate.toLocaleDateString('vi-VN', dateOptions);
    timeDisplay.textContent = currentDate.toLocaleTimeString('vi-VN', timeOptions);
  }
  
  updateDateTime();
  setInterval(updateDateTime, 1000); // Cập nhật ngày giờ mỗi giây