

  document.querySelector('form').addEventListener('submit', (event) => {
    // Kiểm tra xem các trường input có bị bỏ trống không
    let isValid = true;
    inputs.forEach((input) => {
      if (input.value.trim() === '') {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });

    // Nếu có trường bị bỏ trống, ngăn không cho form được gửi đi
    if (!isValid) {
      event.preventDefault();
      alert('Vui lòng điền đầy đủ thông tin.');
    }
  });
