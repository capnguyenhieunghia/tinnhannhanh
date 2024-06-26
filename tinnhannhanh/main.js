const SHEET_ID = '1rR0O90hpWbM5qcM2Y8G30tg3CsX8PMygWh8sx1f4Ido';

let allData = [];

fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`)
    .then(response => response.text())
    .then(data => {
        const json = JSON.parse(data.substring(47, data.length - 2));
        allData = json.table.rows;

        displayData(allData);
    })
    .catch(error => console.error(error));

function displayData(data) {
    const tableBody = document.querySelector(' tbody');
    tableBody.innerHTML = '';

    if (data.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = 'Không có dữ liệu';
        td.colSpan = 2;
        td.style.textAlign = 'center';
        tr.appendChild(td);
        tableBody.appendChild(tr);
    } else {
        data.forEach(row => {
            const tr = document.createElement('tr');
            row.c.forEach((cell, index) => {
                const td = document.createElement('td');
                const cellValue = cell?.v || '';
                const searchTerm = searchInput.value.toLowerCase();
                if (searchTerm && cellValue.toLowerCase().includes(searchTerm)) {
                    td.innerHTML = cellValue.replace(new RegExp(`(${searchTerm})`, 'gi'), '<span class="highlight">$1</span>');
                } else {
                    td.textContent = cellValue;
                }
                const copyBtn = document.createElement('button');
                copyBtn.classList.add('copy-btn');
                copyBtn.textContent = 'Copy';
                copyBtn.onclick = () => copyToClipboard(cellValue);
                td.appendChild(copyBtn);
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = allData.filter(row => {
        return row.c.some(cell => {
            return (cell?.v || '').toLowerCase().includes(searchTerm);
        });
    });
    displayData(filteredData);
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    showCopyNotification();
}

function showCopyNotification() {
    const notification = document.getElementById('copy-notification');
    notification.style.opacity = '1';
    setTimeout(() => {
        notification.style.opacity = '0';
    }, 2000);
}

let scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

scrollToTopBtn.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
const selectMessage = document.getElementById('select-message');

function populateSelectMessage() {
    selectMessage.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'Tất cả';
    selectMessage.add(allOption);

    allData.forEach(row => {
        const option = document.createElement('option');
        option.value = row.c[0].v;
        option.textContent = row.c[0].v;
        selectMessage.add(option);
    });
}

selectMessage.addEventListener('change', () => {
    if (selectMessage.value === 'all') {
        displayData(allData);
    } else {
        const selectedMessage = allData.find(row => row.c[0].v === selectMessage.value);
        displayData([selectedMessage]);
    }
});

fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`)
    .then(response => response.text())
    .then(data => {
        const json = JSON.parse(data.substring(47, data.length - 2));
        allData = json.table.rows;
        populateSelectMessage();
        displayData(allData);
    })
    .catch(error => console.error(error));
function showCopyNotification() {
    const notification = document.getElementById('copy-notification');
    notification.style.opacity = '1';

    // Tạo hiệu ứng pháo hoa
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        notification.style.opacity = '0';
    }, 2000);
}



