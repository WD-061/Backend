import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import upload from './middleware/fileUploader.js';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url); //Users/anojkt/file-upload/backend/middleware/fileUploader.js
const __dirname = dirname(__filename); //Users/anojkt/file-upload/backend/middleware/

app.use(cors());
app.use(express.json());

//Uploading a single file
app.post('/upload', upload.single('displayImage'), (req, res) => {
  console.log('File: ', req.file);
  console.log('Body: ', req.body);

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  res.json({
    location: `http://localhost:3000/files/${req.file.filename}`,
  });
});
app.use('/files', express.static(join(__dirname, 'uploads')));

app.listen(port, () => console.log(`Server is running on ${port}`));
