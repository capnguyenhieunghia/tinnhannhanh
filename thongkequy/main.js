// Your existing JavaScript code remains the same
fetch('https://docs.google.com/spreadsheets/d/1mkbpp7-Qlq8wMwDBiiaytQro86yG-hGBZmO5LJg1OZ8/gviz/tq?tqx=out:json')
.then(response => response.text())
.then(data => {
  const jsonData = JSON.parse(data.substring(47, data.length - 2));
  const rows = jsonData.table.rows;
  const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];

  const expenseTypes = {
    'thu': 1,
    'chi': -1
  };

  let runningTotal = 0;
  rows.forEach(row => {
    const tr = document.createElement('tr');
    row.c.forEach((cell, index) => {
      const td = document.createElement('td');
      if (index === 3) {
        const expenseType = cell?.v?.toLowerCase() || '';
        td.textContent = expenseType;
        const amount = row.c[4]?.v ? parseFloat(row.c[4].v) : 0;
        runningTotal += expenseTypes[expenseType] * amount;
        if (expenseType === 'chi') {
          td.classList.add('expense');
        }
      } else if (index === 4) {
        const amount = cell?.v ? parseFloat(cell.v) : 0;
        if (amount < 0) {
          td.classList.add('expense');
        }
        td.textContent = amount.toLocaleString('vi-VN');
      } else if (index === 5) {
        td.textContent = runningTotal.toLocaleString('vi-VN');
      } else {
        td.textContent = cell?.v || '';
      }
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });

  // Display the current balance in the "Quỹ hiện tại" row
  const currentBalanceCell = document.getElementById('current-balance');
  currentBalanceCell.textContent = runningTotal.toLocaleString('vi-VN');
})
.catch(error => console.error('Error fetching data:', error));