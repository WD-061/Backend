import express from 'express';
import upload from './middlewares/upload.js';

const app = express();

app.get('/', (req, res) => {
  res.json({ msg: 'Running' });
});

app.post('/image-upload', upload.single('img'), (req, res) => {
  console.log(req.file);

  // Example how to store the image url in your database.
  // const product = await ProductSchema.findByIdAndUpdate({img:req.file.secure_url, imgPublicId: req.file.public_id })
  res.json({ msg: 'Image uploaded', img: req.file.secure_url });
});

app.listen(3000, () => {
  console.log('File upload listening on port 3000');
});
