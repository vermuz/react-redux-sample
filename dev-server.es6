const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

const multer = require('multer');
const upload = multer({ dest: './uploads/' });

app.use('/dist', express.static('dist'));

app.get('/api/count', (req, res) => {
  res.contentType('application/json');
  const obj = {"amount": 100};
  setTimeout(() => res.json(obj), 500);
  //res.status(400).json(obj); //for error testing
});

app.post('/api/upload', upload.fields([ { name: 'myFile' } ]), (req, res) => {

  const myFile = req.files.myFile[0];
  const tmp_path = myFile.path;
  const target_path = './' + myFile.originalname;
  // public以下に移動
  fs.rename(tmp_path, target_path, (err) => {
    if (err) throw err;
    // 一時ファイルを削除
    fs.unlink(tmp_path, function() {
      if (err) throw err;
      setTimeout(() => res.json({message: 'File uploaded to: ' + target_path + ' - ' + myFile.size + ' bytes'}), 500);
    });
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server start at port 3000")
});