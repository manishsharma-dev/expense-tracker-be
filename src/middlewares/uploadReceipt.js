const multer = require('multer');

const allowedMimeTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
]);

const fileFilter = (_req, file, cb) => {
  if (!allowedMimeTypes.has(file.mimetype)) {
    cb(Object.assign(new Error('Receipt must be JPG, PNG, WebP, or PDF'), { statusCode: 400 }));
    return;
  }
  cb(null, true);
};

const uploadReceipt = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = { uploadReceipt };
