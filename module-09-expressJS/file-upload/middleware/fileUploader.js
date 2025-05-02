import multer from 'multer';

const storage = multer.diskStorage({
  // To control where the file needs to be stored
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
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
