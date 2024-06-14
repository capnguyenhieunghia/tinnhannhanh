fetch('https://docs.google.com/spreadsheets/d/1hcUIM6H72KoGR5gPLEvqPgFIiYOqa8SS/edit?usp=sharing&ouid=110674459922291190302&rtpof=true&sd=true')
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'application/xml');
    const rows = doc.querySelectorAll('tr');

    const dataRows = document.getElementById('data-rows');

    rows.forEach((row, index) => {
      if (index > 0) {
        const cells = row.querySelectorAll('td');
        const tr = document.createElement('tr');

        cells.forEach(cell => {
          const td = document.createElement('td');
          td.textContent = cell.textContent;
          tr.appendChild(td);
        });

        dataRows.appendChild(tr);
      }
    });
  })
  .catch(error => console.error(error));