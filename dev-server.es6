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

app.post('/api/upload', upload.fields([ { name: 'myFile' }, {name: 'myJson'}]), (req, res) => {

  const myJson = JSON.parse(req.body.myJson);
  console.log(myJson);

  const myFile = req.files.myFile[0];
  const tmp_path = myFile.path;
  const target_path = './' + myFile.originalname;
  fs.rename(tmp_path, target_path, (err) => {
    if (err) throw err;
    fs.unlink(tmp_path, () => {
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