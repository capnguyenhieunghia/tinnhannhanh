// server.js
const express = require('express');
const XLSX = require('xlsx');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/submit-data', (req, res) => {
  const { id, name, phone } = req.body;

  // Đọc file Excel
  let workbook = XLSX.readFile('data.xlsx');
  let worksheet = workbook.getWorksheet(1);

  // Thêm dữ liệu vào worksheet
  let newRowIndex = worksheet.addRow({ id, name, phone }).number;

  // Lưu file Excel
  XLSX.writeFile(workbook, 'data.xlsx');

  res.send(`Dữ liệu đã được lưu vào file Excel, dòng số ${newRowIndex}.`);
});

app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});