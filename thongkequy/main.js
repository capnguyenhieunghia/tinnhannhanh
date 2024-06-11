const sheetUrl = 'https://docs.google.com/spreadsheets/d/11Z8OlkTr3IadLnSF3_9yZnkb_8dZ_gsX3am8XsWLhbY/gviz/tq?tqx=out:json';
let totalIncome = 0;
let totalExpense = 0;
let allData = [];

fetch(sheetUrl)
  .then(response => response.text())
  .then(data => {
    const tableData = JSON.parse(data.substring(47, data.length - 2)).table.rows;
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

    tableData.forEach(row => {
      const newRow = document.createElement('tr');

      row.c.forEach((cell, index) => {
        const newCell = document.createElement('td');
        if (index === 4) {
          const amount = cell?.v || 0;
          newCell.textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
          if (row.c[3]?.v === 'Thu') {
            totalIncome += amount;
          } else if (row.c[3]?.v === 'Chi') {
            totalExpense += amount;
          }
        } else if (index === 3) {
          const type = cell?.v || '-';
          if (type === 'Thu') {
            newCell.textContent = 'Thu';
            newCell.style.color = 'green';
          } else if (type === 'Chi') {
            newCell.textContent = 'Chi';
            newCell.style.color = 'red';
          } else {
            newCell.textContent = type;
          }
        } else {
          newCell.textContent = cell?.v || '-';
        }
        newRow.appendChild(newCell);
      });

      tableBody.appendChild(newRow);
      allData.push(row);
    });

    document.getElementById('totalIncome').textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalIncome);
    document.getElementById('totalExpense').textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalExpense);
    document.getElementById('totalBalance').textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalIncome - totalExpense);

    const filterTypeSelect = document.getElementById('filterType');
    filterTypeSelect.addEventListener('change', filterData);
  })
  .catch(error => console.error('Error:', error));

function filterData() {
  const filterType = document.getElementById('filterType').value;
  const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

  let filteredData = allData;
  if (filterType !== '') {
    filteredData = allData.filter(row => row.c[3]?.v === filterType);
  }

  filteredData.forEach(row => {
    const newRow = document.createElement('tr');

    row.c.forEach((cell, index) => {
      const newCell = document.createElement('td');
      if (index === 4) {
        const amount = cell?.v || 0;
        newCell.textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
      } else if (index === 3) {
        const type = cell?.v || '-';
        if (type === 'Thu') {
          newCell.textContent = 'Thu';
          newCell.style.color = 'green';
        } else if (type === 'Chi') {
          newCell.textContent = 'Chi';
          newCell.style.color = 'red';
        } else {
          newCell.textContent = type;
        }
      } else {
        newCell.textContent = cell?.v || '-';
      }
      newRow.appendChild(newCell);
    });

    tableBody.appendChild(newRow);
  });

  document.getElementById('totalIncome').textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(filteredData.filter(row => row.c[3]?.v === 'Thu').reduce((acc, row) => acc + (row.c[4]?.v || 0), 0));
  document.getElementById('totalExpense').textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(filteredData.filter(row => row.c[3]?.v === 'Chi').reduce((acc, row) => acc + (row.c[4]?.v || 0), 0));
  document.getElementById('totalBalance').textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(filteredData.filter(row => row.c[3]?.v === 'Thu').reduce((acc, row) => acc + (row.c[4]?.v || 0), 0) - filteredData.filter(row => row.c[3]?.v === 'Chi').reduce((acc, row) => acc + (row.c[4]?.v || 0), 0));
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
const buttonsEl = document.querySelectorAll("button");

const inputFieldEl = document.getElementById("result");

for (let i = 0; i < buttonsEl.length; i++) {
  buttonsEl[i].addEventListener("click", () => {
    const buttonValue = buttonsEl[i].textContent;
    if (buttonValue === "C") {
      clearResult();
    } else if (buttonValue === "=") {
      calculateResult();
    } else {
      appendValue(buttonValue);
    }
  });
}

function clearResult() {
  inputFieldEl.value = "";
}

function calculateResult() {
  inputFieldEl.value = eval(inputFieldEl.value);
}

function appendValue(buttonValue) {
  inputFieldEl.value += buttonValue;
  //   inputFieldEl.value = inputFieldEl.value + buttonValue;
}
