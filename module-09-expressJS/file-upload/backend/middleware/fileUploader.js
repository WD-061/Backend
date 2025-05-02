import { mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url); //Users/anojkt/file-upload/backend/middleware/fileUploader.js
const __dirname = dirname(__filename); //Users/anojkt/file-upload/backend/middleware/

const fileDirectory = join(__dirname, '../uploads'); //Users/anojkt/file-upload/backend/uploads

const storage = multer.diskStorage({
  // To control where the file needs to be stored
  destination: function (req, file, cb) {
    //The below if statement checks if the folder exists and creates one if it doesn't exist
    if (!existsSync(fileDirectory)) {
      mkdirSync(fileDirectory, { recursive: true });
    }
    cb(null, fileDirectory);
  },
  // To control the naming of the file
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

// To filter the file. Remember this is not part of the above diskStorage.
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const mimeType = file.mimetype;
  console.log(mimeType);

  if (allowedMimeTypes.includes(mimeType)) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10, //10MB
  },
});

export default upload;
