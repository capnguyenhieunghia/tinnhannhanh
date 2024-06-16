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
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';

    data.forEach(row => {
        const tr = document.createElement('tr');
        row.c.forEach((cell, index) => {
            const td = document.createElement('td');
            td.textContent = cell?.v || '';
            const copyBtn = document.createElement('button');
            copyBtn.classList.add('copy-btn');
            copyBtn.textContent = 'Copy';
            copyBtn.onclick = () => copyToClipboard(cell?.v || '');
            td.appendChild(copyBtn);
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
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
    alert('Đã sao chép vào clipboard!');
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
const selectMessage = document.getElementById('select-message');

// Lưu các tin nhắn vào danh sách select
function populateSelectMessage() {
    selectMessage.innerHTML = '';

    // Thêm lựa chọn "Tất cả"
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

// Hiển thị dữ liệu của tin nhắn được chọn
selectMessage.addEventListener('change', () => {
    if (selectMessage.value === 'all') {
        displayData(allData);
    } else {
        const selectedMessage = allData.find(row => row.c[0].v === selectMessage.value);
        displayData([selectedMessage]);
    }
});

// Gọi hàm populateSelectMessage() khi dữ liệu đã được tải xong
fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`)
    .then(response => response.text())
    .then(data => {
        const json = JSON.parse(data.substring(47, data.length - 2));
        allData = json.table.rows;
        populateSelectMessage();
        displayData(allData);
    })
    .catch(error => console.error(error));