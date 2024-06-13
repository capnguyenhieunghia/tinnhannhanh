function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        const notification = document.getElementById('copy-notification');
        notification.style.opacity = '1';
        setTimeout(() => {
          notification.style.opacity = '0';
        }, 2000);
        console.log('Text copied to clipboard:', text);
      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
      });
  }

  fetch('https://docs.google.com/spreadsheets/d/1wmVxlgrp4gHr-0y6RxY-_t_oZh5aFgBD2A8DQFHfkpM/export?format=csv')
    .then(response => response.text())
    .then(data => {
      const rows = data.trim().split('\n');
      const cardContainer = document.getElementById('card-container');

      rows.forEach((row, index) => {
        if (index > 0) { // Skip the header row
          const [tenMayNhanh, matKhau, ipServer, trangThai] = row.split(',');
          const statusClass = trangThai.trim().toLowerCase() === 'hoạt động' ? 'active' : 'inactive';

          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
            <h3>${tenMayNhanh}</h3>
            <p>Mật khẩu: ${matKhau} <span class="copy-btn" onclick="copyToClipboard('${matKhau}')">Copy</span></p>
            <p>IP server: ${ipServer} <span class="copy-btn" onclick="copyToClipboard('${ipServer}')">Copy</span></p>
            <p id="tt" class="${statusClass}">Trạng thái: ${trangThai}</p>
          `;
          cardContainer.appendChild(card);
        }
      });
    })
    .catch(error => console.error('Error:', error));