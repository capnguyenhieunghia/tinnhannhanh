fetch('https://docs.google.com/spreadsheets/d/1CWD5MdGeKRkPm20RfvCL0wAcXSQsU7gzex07a0kNrOE/export?format=csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n').slice(1); // skip the header row
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const statisticsList = document.getElementById('statistics-list');
    // Tạo một object để lưu trữ kết quả thống kê
    const statistics = {};
    rows.forEach(row => {
      const cells = row.split(',');
      const tr = document.createElement('tr');
      cells.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
      // Cập nhật thống kê
      const result = cells[9]; // Kết quả tư vấn điện thoại
      if (statistics[result]) {
        statistics[result]++;
      } else {
        statistics[result] = 1;
      }
    });
    // Hiển thị thống kê
    Object.entries(statistics).forEach(([result, count]) => {
      const li = document.createElement('li');
      li.textContent = `${result}: ${count}`;
      statisticsList.appendChild(li);
    });

    // Thêm các tùy chọn lọc vào select
    const uniqueResults = new Set(Object.keys(statistics));
    const filterSelect = document.getElementById('filterByResult');

    uniqueResults.forEach(result => {
      const option = document.createElement('option');
      option.value = result;
      option.textContent = result;
      filterSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

function filterByID() {
  const filterValue = document.getElementById('filterById').value.toLowerCase();
  const rows = document.querySelectorAll('#dataTable tbody tr');

  rows.forEach(row => {
    const id = row.cells[1].textContent.toLowerCase();
    if (id.includes(filterValue)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function filterByResult() {
  const filterValue = document.getElementById('filterByResult').value;
  const rows = document.querySelectorAll('#dataTable tbody tr');

  rows.forEach(row => {
    const result = row.cells[9].textContent;
    if (filterValue === '' || result === filterValue) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}
function filterByID() {
  const filterValue = document.getElementById('filterById').value.toLowerCase();
  const rows = document.querySelectorAll('#dataTable tbody tr');

  rows.forEach(row => {
    const id = row.cells[1].textContent.toLowerCase();
    if (id.includes(filterValue)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}
function filterByPhone() {
  const filterValue = document.getElementById('filterByPhone').value.toLowerCase();
  const rows = document.querySelectorAll('#dataTable tbody tr');

  rows.forEach(row => {
    const phone1 = row.cells[3].textContent.toLowerCase();
    const phone2 = row.cells[4].textContent.toLowerCase();
    if (phone1.includes(filterValue) || phone2.includes(filterValue)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}
// 
document.getElementById('exportToExcel').addEventListener('click', () => {
  const table = document.getElementById('dataTable');
  const rows = table.querySelectorAll('tbody tr:not([style*="display: none"])');

  const data = [
    ['STT', 'ID', 'Họ và tên', 'SĐT', 'SĐT 2', 'Email', 'Trường - Tỉnh', 'Đoàn', 'Ngày ĐK online', 'Kết quả tư vấn điện thoại', 'Nhân sự tư vấn', 'Ngày tư vấn', 'Ghi chú', 'Người cập nhật', 'Nhà mạng']
  ];

  rows.forEach((row, index) => {
    const cells = row.querySelectorAll('td');
    const rowData = [];
    cells.forEach(cell => {
      rowData.push(cell.textContent);
    });
    data.push(rowData);
  });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, 'data.xlsx');
});