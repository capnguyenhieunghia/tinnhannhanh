fetch('data.xml')
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'application/xml');

    const items = doc.getElementsByTagName('item');
    const dataContainer = document.getElementById('data-container');
    const searchInput = document.getElementById('search-input');

    // Lưu trữ các phần tử item để sử dụng sau
    const itemElements = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const id = item.getElementsByTagName('id')[0].textContent;
      const name = item.getElementsByTagName('name')[0].textContent;
      const content = item.getElementsByTagName('content')[0].textContent;

      const itemElement = document.createElement('div');
      itemElement.classList.add('item');

      const idElement = document.createElement('h5');
      idElement.textContent = `ID: ${id}`;

      const nameElement = document.createElement('h3');
      nameElement.textContent = name;

      const contentElement = document.createElement('p');
      contentElement.textContent = content;
      // Thêm nút sao chép nội dung
      const copyButton = document.createElement('button');
      copyButton.textContent = 'Copy';
      copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(content);
        alert('Nội dung đã được sao chép vào clipboard!');
      });
      itemElement.appendChild(idElement);
      itemElement.appendChild(nameElement);
      itemElement.appendChild(contentElement);
      itemElement.appendChild(copyButton);
      dataContainer.appendChild(itemElement);
      itemElements.push(itemElement);
    }

    // Xử lý sự kiện tìm kiếm
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      itemElements.forEach(item => {
        const id = item.querySelector('h5').textContent.toLowerCase();
        const name = item.querySelector('h3').textContent.toLowerCase();
        if (id.includes(searchTerm) || name.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });