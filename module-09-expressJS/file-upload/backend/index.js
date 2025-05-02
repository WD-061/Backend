import express from 'express';
import cors from 'cors';
import upload from './middleware/fileUploader.js';

const app = express();
const port = process.env.PORT || 3000;

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
    message: 'File uploaded successfully.',
  });
});

app.listen(port, () => console.log(`Server is running on ${port}`));
