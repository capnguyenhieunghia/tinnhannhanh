fetch('https://docs.google.com/spreadsheets/d/1StDAeGsPGsz6g94QAAT4MkxNGJib_-77KZT3lmrSYgo/export?format=csv')
.then(response => response.text())
.then(data => {
  const rows = data.trim().split('\n');
  const tableBody = document.querySelector('#shiftTable tbody');
  const shiftCountTableBody = document.querySelector('#shiftCountTable tbody');
  const shiftCounts = {};

  rows.slice(1).forEach(row => {
    const [name, date, day, shift, hours] = row.split(',');
    const totalHours = calculateTotalHours(shift, hours);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${name}</td>
      <td>${date}</td>
      <td>${day}</td>
      <td>${shift}</td>
      <td>${hours}</td>
      <td>${totalHours.slice(0, -3)}</td>
    `;
    tableBody.appendChild(tr);

    // Tính toán và lưu trữ tổng số buổi trực của mỗi nhân viên
    shiftCounts[name] = (shiftCounts[name] || 0) + 1;
  });

  // Thêm dòng tổng kết vào bảng tổng số buổi trực
  Object.entries(shiftCounts).forEach(([name, count]) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${name}</td>
      <td>${count}</td>
    `;
    shiftCountTableBody.appendChild(tr);
  });

  // Thêm chức năng lọc tự động
  const nameFilter = document.getElementById('nameFilter');
  const startDateFilter = document.getElementById('startDateFilter');
  const endDateFilter = document.getElementById('endDateFilter');

  nameFilter.addEventListener('input', filterData);
  startDateFilter.addEventListener('input', filterData);
  endDateFilter.addEventListener('input', filterData);

  function filterData() {
    const name = nameFilter.value;
    const startDate = startDateFilter.value;
    const endDate = endDateFilter.value;

    const rows = document.querySelectorAll('#shiftTable tbody tr');
    rows.forEach(row => {
      const rowName = row.children[0].textContent;
      const rowDate = row.children[1].textContent;

      let isVisible = true;

      if (name && !rowName.includes(name)) {
        isVisible = false;
      }

      if (startDate && rowDate < startDate) {
        isVisible = false;
      }

      if (endDate && rowDate > endDate) {
        isVisible = false;
      }

      row.style.display = isVisible ? '' : 'none';
    });
  }
})
.catch(error => console.error(error));

function calculateTotalHours(shift, hours) {
const [start, end] = hours.split(' - ');
const [startHour, startMinute] = start.split(':');
const [endHour, endMinute] = end.split(':');

const startTime = new Date();
startTime.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);

const endTime = new Date();
endTime.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);

const totalMilliseconds = endTime.getTime() - startTime.getTime();
const totalHours = totalMilliseconds / (1000 * 60 * 60);

return totalHours.toFixed(2);
}
// quay lại đầu trang
// Get the button
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.addEventListener("click", function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});