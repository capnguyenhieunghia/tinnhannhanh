// Load the data from the Excel file
fetch('data.xlsx')
    .then(response => response.arrayBuffer())
    .then(buffer => {
        const data = new Uint8Array(buffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Populate the table headers
        const headerRow = document.getElementById('table-headers');
        Object.keys(jsonData[0]).forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            const copyBtn = document.createElement('button');
            copyBtn.textContent = 'Copy';
            copyBtn.classList.add('copy-btn');
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(header);
                alert(`Copied "${header}" to clipboard.`);
            });
            th.appendChild(copyBtn);
            headerRow.appendChild(th);
        });

        // Populate the table body
        const tableBody = document.getElementById('table-body');
        jsonData.forEach(row => {
            const tr = document.createElement('tr');
            Object.values(row).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                const copyBtn = document.createElement('button');
                copyBtn.textContent = 'Copy';
                copyBtn.classList.add('copy-btn');
                copyBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText(value);
                    alert(`Copied "${value}" to clipboard.`);
                });
                td.appendChild(copyBtn);
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });

        // Add the search functionality

        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const rows = tableBody.getElementsByTagName('tr');
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                let shouldShow = false;
                const cells = row.getElementsByTagName('td');
                for (let j = 0; j < cells.length; j++) {
                    const cell = cells[j];
                    if (cell.textContent.toLowerCase().includes(searchTerm)) {
                        shouldShow = true;
                        break;
                    }
                }
                row.style.display = shouldShow ? 'table-row' : 'none';
            }
        });

    })
    .catch(error => console.error(error));