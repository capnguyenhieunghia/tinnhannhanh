function submitData() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
  
    var formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('phone', phone);
  
    fetch('/save-to-excel', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log('Dữ liệu đã được lưu vào file data.xlsx');
        alert('Dữ liệu đã được lưu thành công!');
      } else {
        console.error('Có lỗi xảy ra khi lưu dữ liệu.');
        alert('Có lỗi xảy ra khi lưu dữ liệu.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Đã xảy ra lỗi, vui lòng thử lại sau.');
    });
  }