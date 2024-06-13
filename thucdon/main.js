fetch('https://docs.google.com/spreadsheets/d/1X9YB5k7Aoo4H5kS5vgCIfgPye4QayYtVh0yk_AWs8BY/gviz/tq?tqx=out:json')
.then(response => response.text())
.then(data => {
    const jsonData = JSON.parse(data.substring(47, data.length - 2));
    const rows = jsonData.table.rows;

    const tableBody = document.getElementById('menu-table').getElementsByTagName('tbody')[0];
    rows.forEach(row => {
        const newRow = document.createElement('tr');
        row.c.forEach(cell => {
            const newCell = document.createElement('td');
            newCell.textContent = cell?.v || '';
            newRow.appendChild(newCell);
        });
        tableBody.appendChild(newRow);
    });

    const lastUpdatedElement = document.getElementById('last-updated');
    const currentDate = new Date();
    lastUpdatedElement.textContent = `Cập nhật lần cuối: ${currentDate.toLocaleString()}`;
})
.catch(error => console.error('Error fetching data:', error));